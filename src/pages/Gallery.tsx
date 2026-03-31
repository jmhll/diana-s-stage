import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ScrollReveal from "@/components/ScrollReveal";
import { Play } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type GalleryItem = Tables<"gallery_items">;

const Gallery = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const { data: items = [] } = useQuery({
    queryKey: ["gallery_items"],
    queryFn: async () => {
      const { data } = await supabase
        .from("gallery_items")
        .select("*")
        .order("sort_order", { ascending: true });
      return data ?? [];
    },
  });

  const filters = [
    { key: "all", label: t("gallery.all") },
    { key: "foto", label: t("gallery.photos") },
    { key: "video", label: t("gallery.videos") },
    { key: "actriu", label: t("gallery.actressCategory") },
    { key: "presentadora", label: t("gallery.presenterCategory") },
    { key: "serveis", label: t("nav.services") },
    { key: "general", label: "General" },
  ];

  const filtered = items.filter((item) => {
    if (filter === "all") return true;
    if (filter === "foto" || filter === "video") return item.type === filter;
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

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">{t("admin.noItems")}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.05}>
                <div
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => setSelected(item)}
                >
                  {item.type === "video" ? (
                    <video
                      src={item.media_url}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      muted
                      preload="metadata"
                      onLoadedData={(e) => {
                        e.currentTarget.currentTime = 1;
                      }}
                    />
                  ) : (
                    <img
                      src={item.media_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors flex items-center justify-center">
                    {item.type === "video" && (
                      <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity">
                        <Play className="h-5 w-5 text-white ml-0.5" />
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
        )}
      </section>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border-0">
          {selected && (
            <div className="relative">
              <img src={selected.media_url} alt={selected.title} className="w-full h-auto max-h-[80vh] object-contain" />
              <div className="p-4">
                <h3 className="font-display text-xl font-semibold text-foreground">{selected.title}</h3>
                {selected.description && (
                  <p className="text-sm text-muted-foreground mt-1">{selected.description}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
