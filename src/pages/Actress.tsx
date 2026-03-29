import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";

const placeholderPhotos = [
  { id: 1, url: "/images/actress-photo-1.jpeg", alt: "Diana perfil" },
  { id: 2, url: "/images/actress-photo-2.jpeg", alt: "Diana vertical negre" },
  { id: 3, url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop", alt: "Photo 3" },
  { id: 4, url: "/images/actress-photo-4.jpeg", alt: "Escena teatral" },
  { id: 5, url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop", alt: "Photo 5" },
  { id: 6, url: "/images/actress-photo-6.jpeg", alt: "Actuació teatral" },
];

const placeholderShows = [
  { title: "Monòleg 'Llum i Ombra'", year: "2025", venue: "Teatre Lliure" },
  { title: "L'última carta", year: "2024", venue: "Teatre Nacional" },
  { title: "Somnis d'hivern", year: "2023", venue: "Sala Beckett" },
];

const Actress = () => {
  const { t } = useTranslation();

  return (
    <div className="py-12">
      {/* Header */}
      <section className="relative py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
              {t("actress.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {t("actress.subtitle")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="videobook" className="w-full">
          <TabsList className="w-full justify-start flex-wrap h-auto gap-1 bg-transparent p-0 mb-8">
            <TabsTrigger value="videobook" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6">
              {t("actress.videobook")}
            </TabsTrigger>
            <TabsTrigger value="photos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6">
              {t("actress.photos")}
            </TabsTrigger>
            <TabsTrigger value="shows" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6">
              {t("actress.shows")}
            </TabsTrigger>
            <TabsTrigger value="cv" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6">
              {t("actress.cv")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videobook">
            <ScrollReveal>
              <p className="text-muted-foreground mb-6">{t("actress.videobookDesc")}</p>
              <p className="text-center text-muted-foreground py-12">{t("actress.noVideos", "No hi ha vídeos disponibles de moment.")}</p>
            </ScrollReveal>
          </TabsContent>

          <TabsContent value="photos">
            <ScrollReveal>
              <p className="text-muted-foreground mb-6">{t("actress.photosDesc")}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {placeholderPhotos.map((photo) => (
                  <div key={photo.id} className="overflow-hidden rounded-lg group cursor-pointer">
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </TabsContent>

          <TabsContent value="shows">
            <ScrollReveal>
              <p className="text-muted-foreground mb-6">{t("actress.showsDesc")}</p>
              <div className="space-y-4">
                {placeholderShows.map((show, i) => (
                  <Card key={i} className="border border-border hover:border-primary/30 transition-colors">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-foreground">{show.title}</h3>
                        <p className="text-sm text-muted-foreground">{show.venue}</p>
                      </div>
                      <span className="text-sm font-medium text-primary">{show.year}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollReveal>
          </TabsContent>

          <TabsContent value="cv">
            <ScrollReveal>
              <p className="text-muted-foreground mb-6">{t("actress.cvDesc")}</p>
              <Card className="border border-border">
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">{t("actress.cvTraining")}</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• {t("actress.cvTraining1")}</li>
                      <li>• {t("actress.cvTraining2")}</li>
                      <li>• {t("actress.cvTraining3")}</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">{t("actress.cvExperience")}</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• {t("actress.cvExperience1")}</li>
                      <li>• {t("actress.cvExperience2")}</li>
                      <li>• {t("actress.cvExperience3")}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Actress;
