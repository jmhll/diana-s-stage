import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";

const placeholderPhotos = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  url: `https://images.unsplash.com/photo-${
    [
      "1494790108377-be9c29b29330",
      "1534528741775-53994a69daeb",
      "1517841905240-472988babdf9",
      "1488426862026-3ee34a7d66df",
      "1524504388940-b1c1722653e1",
      "1502823403499-6ccfcf4fb453",
    ][i]
  }?w=400&h=500&fit=crop`,
  alt: `Photo ${i + 1}`,
}));

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-video rounded-lg overflow-hidden border border-border">
                  <video src="/videos/IMG_5121.MOV" controls className="w-full h-full object-cover" />
                </div>
                <div className="aspect-video rounded-lg overflow-hidden border border-border">
                  <video src="/videos/IMG_7437.MOV" controls className="w-full h-full object-cover" />
                </div>
              </div>
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
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">Formació</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Grau en Art Dramàtic – Institut del Teatre (2012-2016)</li>
                      <li>• Tècnica Meisner – Barcelona (2017)</li>
                      <li>• Curs de Veu i Dicció – RESAD Madrid (2018)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">Experiència</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• +15 produccions teatrals professionals</li>
                      <li>• Participació en sèries de televisió</li>
                      <li>• Curtmetratges premiats en festivals</li>
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
