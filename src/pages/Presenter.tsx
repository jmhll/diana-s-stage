import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";
import { Play } from "lucide-react";

const placeholderVideos = [
  { title: "Gala Premis Cultura 2025", thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=340&fit=crop" },
  { title: "Nit de la Ciència 2024", thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=340&fit=crop" },
  { title: "Festival Arts Barcelona", thumbnail: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=340&fit=crop" },
];

const featuredEvents = [
  { title: "Gala Premis Cultura", year: "2025", description: "Presentació de la gala anual dels premis de cultura de Catalunya." },
  { title: "Nit de la Ciència", year: "2024", description: "Conducció de la nit de divulgació científica al CosmoCaixa." },
  { title: "Festival Arts Barcelona", year: "2023", description: "Mestra de cerimònies del festival internacional d'arts escèniques." },
];

const Presenter = () => {
  const { t } = useTranslation();

  return (
    <div className="py-12">
      <section className="relative py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
              {t("presenter.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {t("presenter.subtitle")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Videos */}
      <section className="container mx-auto px-4 py-16">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t("presenter.videosTitle")}
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholderVideos.map((video, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="group cursor-pointer">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center shadow-lg">
                      <Play className="h-6 w-6 text-secondary-foreground ml-0.5" />
                    </div>
                  </div>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{video.title}</h3>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Featured Events */}
      <section className="container mx-auto px-4 py-16">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t("presenter.featuredTitle")}
          </h2>
        </ScrollReveal>
        <div className="space-y-4">
          {featuredEvents.map((event, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Card className="border border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-1">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                    <span className="text-sm font-medium text-primary shrink-0">{event.year}</span>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Presenter;
