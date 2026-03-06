import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ScrollReveal from "@/components/ScrollReveal";
import { X, Play } from "lucide-react";

type GalleryItem = {
  id: number;
  type: "photo" | "video";
  category: "actriu" | "presentadora";
  url: string;
  title: string;
};

const galleryItems: GalleryItem[] = [
  { id: 1, type: "photo", category: "actriu", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop", title: "Sessió fotogràfica 1" },
  { id: 2, type: "photo", category: "actriu", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop", title: "Sessió fotogràfica 2" },
  { id: 3, type: "photo", category: "presentadora", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=600&fit=crop", title: "Gala event" },
  { id: 4, type: "video", category: "actriu", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=600&fit=crop", title: "Escena teatral" },
  { id: 5, type: "photo", category: "presentadora", url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=600&fit=crop", title: "Presentació TV" },
  { id: 6, type: "photo", category: "actriu", url: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=600&fit=crop", title: "Assaig" },
  { id: 7, type: "video", category: "presentadora", url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=600&fit=crop", title: "Festival" },
  { id: 8, type: "photo", category: "actriu", url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=600&fit=crop", title: "Retrat" },
];

const Gallery = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const filters = [
    { key: "all", label: t("gallery.all") },
    { key: "photo", label: t("gallery.photos") },
    { key: "video", label: t("gallery.videos") },
    { key: "actriu", label: t("gallery.actressCategory") },
    { key: "presentadora", label: t("gallery.presenterCategory") },
  ];

  const filtered = galleryItems.filter((item) => {
    if (filter === "all") return true;
    if (filter === "photo" || filter === "video") return item.type === filter;
    return item.category === filter;
  });

  return (
    <div className="py-12">
      <section className="relative py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
              {t("gallery.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {t("gallery.subtitle")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {filters.map((f) => (
            <Button
              key={f.key}
              variant={filter === f.key ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.05}>
              <div
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => setSelected(item)}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors flex items-center justify-center">
                  {item.type === "video" && (
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                      <Play className="h-5 w-5 text-secondary-foreground ml-0.5" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm text-primary-foreground font-medium">{item.title}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-0">
          {selected && (
            <div className="relative">
              <img src={selected.url} alt={selected.title} className="w-full h-auto max-h-[80vh] object-contain" />
              <div className="p-4">
                <h3 className="font-display text-xl font-semibold text-foreground">{selected.title}</h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
