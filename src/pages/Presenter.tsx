import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";
import imgPremis from "@/assets/presentadora_premis.jpeg";
import imgEndofest from "@/assets/presentadora_endofest.jpg";
import imgForum from "@/assets/presentadora_forum.jpg";

const photoKeys = ["premis", "endofest", "forum"] as const;
const photoImages = [imgPremis, imgEndofest, imgForum];


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

      {/* Photos */}
      <section className="container mx-auto px-4 py-16">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t("presenter.photosTitle")}
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {photoKeys.map((key, i) => (
            <ScrollReveal key={key} delay={i * 0.1}>
              <div className="group">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3">
                  <img src={photoImages[i]} alt={t(`presenter.photo_${key}`)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{t(`presenter.photo_${key}`)}</h3>
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
          {(["endofest", "forum", "migrant", "somriures", "concurs"] as const).map((key, i) => (
            <ScrollReveal key={key} delay={i * 0.1}>
              <Card className="border border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {t(`presenter.featured_${key}`)}
                  </h3>
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
