import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const placeholderPhotos = [
  { id: 1, url: "/images/actress-photo-1.jpeg", alt: "Diana perfil" },
  { id: 2, url: "/images/actress-photo-2.jpeg", alt: "Diana vertical negre" },
  { id: 3, url: "/images/actress-photo-3.jpeg", alt: "Diana cos sencer" },
  { id: 4, url: "/images/actress-photo-4.jpeg", alt: "Escena teatral" },
  { id: 5, url: "/images/actress-photo-5.jpeg", alt: "Diana frontal somriure" },
  { id: 6, url: "/images/actress-photo-6.jpeg", alt: "Actuació teatral" },
];

const showKeys = ["voces", "tesoro", "escenas"] as const;

const theatreWorks = [
  { year: "2025", title: "Elefant a la sala", role: "Coral" },
  { year: "2024", title: "Ecopia", role: "Coral" },
  { year: "2023", title: "Impro feminista / Improsolidaria", role: "Coprotagonista" },
  { year: "2023", title: "Mensual", role: "Presentadora" },
  { year: "2023", title: "SpeakCorner. Monòlegs", role: "Unipersonal" },
  { year: "2022", title: "El meu amic extraterrestre", role: "Protagonista" },
  { year: "2022", title: "Aventura en Estel", role: "Unipersonal" },
  { year: "2022", title: "Puertas Abiertas", role: "Coral" },
  { year: "2022", title: "Spinoff", role: "Coral" },
  { year: "2022", title: "Super Jam", role: "Protagonista" },
  { year: "2022", title: "Llibreta blava", role: "" },
  { year: "2021", title: "Paradís del Relat", role: "Coral" },
  { year: "2020", title: "Historias", role: "Coral" },
  { year: "2020", title: "Better late que nunca", role: "Coral" },
  { year: "2019", title: "L'amansipament de les fúries", role: "Figuració" },
  { year: "2019", title: "S'ha acabat el bròquil", role: "Coprotagonista" },
  { year: "2019", title: "Break it / Match", role: "Coral" },
  { year: "2019", title: "Mejor bien acompañado / Conmigo", role: "Coral" },
  { year: "2019", title: "The Big Brain", role: "Protagonista" },
  { year: "2018", title: "Massager / The tiny glass person", role: "Coral" },
  { year: "2016", title: "3-D Dones", role: "Coprotagonista" },
  { year: "2016", title: "Tres germanes, Tchekhov", role: "Coprotagonista" },
  { year: "2010", title: "Torna-la a tocar Sam", role: "Coprotagonista" },
  { year: "2009", title: "Moliere's 14,21", role: "Coprotagonista" },
  { year: "2008", title: "Kaos", role: "Coprotagonista" },
  { year: "2007", title: "La Passió", role: "Secundària" },
  { year: "2002", title: "Monólogo: Los estudiantes de Andreu Buenafuente", role: "Protagonista" },
];

const featureFilms = [
  { year: "2019", title: "Antonio", role: "Secundària" },
  { year: "2011", title: "Regression", role: "Secundària" },
  { year: "2010", title: "Ushima Next", role: "Secundària" },
];

const shortFilms = [
  { year: "2010", title: "Los Dooh Nibors", role: "Coprotagonista" },
  { year: "2010", title: "Les emocions", role: "Protagonista" },
  { year: "2008", title: "Charly", role: "Secundària" },
];

const companies = [
  "El Ensamble - Teatre Playback",
  "INCA teatre - immersiu/sensorial",
  "Better Late que Nunca - Improvisació en anglès",
  "Spinoff",
  "Maravilla Theater - Teatre físic performàtic",
];

const socialTheatreProjects = [
  "\"Espai Dona\" Dones Immigrants. Ajuntament de Sabadell",
  "\"Curriculum ocult. Orienta\" Persones Desocupades. Ajuntament de Molins de Rei",
  "\"Imagina\" Persones amb trastorns mentals. Hospital Benito Menni",
];

const Actress = () => {
  const { t } = useTranslation();

  const CvSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <h3 className="font-display text-xl font-bold text-foreground mb-3 border-b border-primary/20 pb-1">{title}</h3>
      {children}
    </div>
  );

  const WorkTable = ({ items }: { items: { year: string; title: string; role: string }[] }) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="py-1.5 pr-3 text-primary font-medium w-16">{item.year}</td>
              <td className="py-1.5 pr-3 text-foreground">{item.title}</td>
              <td className="py-1.5 text-muted-foreground italic">{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

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
              <div className="mb-8 rounded-lg overflow-hidden">
                <video
                  controls
                  className="w-full max-h-[500px] object-contain bg-black"
                  preload="metadata"
                >
                  <source src="/videos/espectacle-impro.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="space-y-4">
                {showKeys.map((key) => (
                  <Card key={key} className="border border-border hover:border-primary/30 transition-colors">
                    <CardContent className="p-6">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">{t(`actress.show_${key}_title`)}</h3>
                      <p className="text-sm text-muted-foreground">{t(`actress.show_${key}_desc`)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollReveal>
          </TabsContent>

          <TabsContent value="cv">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">{t("actress.cvDesc")}</p>
                <a href="/documents/CV_Diana_Hermoso.pdf" download>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    {t("actress.cvDownload")}
                  </Button>
                </a>
              </div>

              <Card className="border border-border">
                <CardContent className="p-6 md:p-8 space-y-2">
                  {/* TEATRE */}
                  <CvSection title={t("actress.cvTheatre")}>
                    <WorkTable items={theatreWorks} />
                  </CvSection>

                  {/* CINEMA */}
                  <CvSection title={t("actress.cvCinema")}>
                    <h4 className="font-semibold text-foreground text-sm mb-2">{t("actress.cvFeatureFilms")}</h4>
                    <WorkTable items={featureFilms} />
                    <h4 className="font-semibold text-foreground text-sm mt-4 mb-2">{t("actress.cvShortFilms")}</h4>
                    <WorkTable items={shortFilms} />
                  </CvSection>

                  {/* COMPANYIES */}
                  <CvSection title={t("actress.cvCompanies")}>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {companies.map((c, i) => <li key={i}>• {c}</li>)}
                    </ul>
                  </CvSection>

                  {/* DOCÈNCIA */}
                  <CvSection title={t("actress.cvTeaching")}>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 2022 Festival Impro Salento</li>
                      <li>• 2009/Actualment: Cooperativa Artistes Pedagogs. Teatre Teràpia per a grups i empreses</li>
                      <li>• Extraescolars per escoles i Instituts</li>
                      <li>• Escola de teatre Complot Escénico</li>
                    </ul>
                  </CvSection>

                  {/* TEATRE SOCIAL */}
                  <CvSection title={t("actress.cvSocialTheatre")}>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {socialTheatreProjects.map((p, i) => <li key={i}>• {p}</li>)}
                    </ul>
                  </CvSection>

                  {/* VEU I CANT */}
                  <CvSection title={t("actress.cvVoiceSinging")}>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Mètode Linklater: Alyssa Ciccarello</li>
                      <li>• Cant: Marc Durandeau</li>
                      <li>• Veu: Silvia Molins, Isabelle Bres</li>
                    </ul>
                  </CvSection>

                  {/* INTERPRETACIÓ */}
                  <CvSection title={t("actress.cvActing")}>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Càmera: Esteve Rovira, Daniel Sesé, Alfonso Albacete</li>
                      <li>• Escuela Eolia: tècnica Daulte, Roger Pera, Roberto Cairo, Ana Casas, Mercé Solé, Santi Ibáñez, Tony Corvillo, Eugenio Barba i Julia Varley</li>
                      <li>• Programa de Tècnica Meisner: Javier Galitó-Cava, Tècnica Alexander Anna Sabaté, Sonia Espinosa</li>
                      <li>• Risk & Danger: Valentina Callandriello</li>
                    </ul>
                  </CvSection>

                  {/* COS I DANSA */}
                  <CvSection title={t("actress.cvBodyDance")}>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Teatre físic: escuela Moveo</li>
                      <li>• Mimo i màscara: Martin Curletto</li>
                      <li>• Moviment: Neus Suñé</li>
                      <li>• Dansa: Ballet, Dansa del Ventre, Dansa africana, Jazz, Balls de Saló, Patinatge Artístic</li>
                    </ul>
                  </CvSection>

                  {/* IMPROVISACIÓ */}
                  <CvSection title={t("actress.cvImprovisation")}>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Barcelona Improv Group</li>
                      <li>• Jorge Yamam - Teatre Eolia</li>
                      <li>• Nadia Zuñiga - El Ensamble Teatro Playback Barcelona</li>
                      <li>• Carla Rovira - Parking Shakespeare / Teatre Grec</li>
                      <li>• Jules Munns - Greek International Improv Comedy Festival</li>
                      <li>• Diego Ingold - Festival Barcelona Improvisa</li>
                      <li>• Cheolsung Lee - Festival Grec Barcelona</li>
                      <li>• Feña Ortalli - BIG IF 5 Barcelona</li>
                      <li>• Alain Chipot - TeatreNeu Barcelona</li>
                    </ul>
                  </CvSection>

                  {/* MASTERCLASS */}
                  <CvSection title={t("actress.cvMasterclass")}>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Joe Bill: Scenes</li>
                      <li>• Heather Urquhart: Intimacy and naturalism</li>
                      <li>• Jaklene Vukasinovic: Making a monster</li>
                      <li>• Menelaos Prokos: Life on stage</li>
                      <li>• Planeta Impro, Angel Galán</li>
                      <li>• David Moncada: Dramaturgia</li>
                      <li>• José Malaguilla: Imprólogo</li>
                      <li>• Rafa Villena: Contexto y valores</li>
                    </ul>
                  </CvSection>

                  {/* ARTS MARCIALS */}
                  <CvSection title={t("actress.cvMartialArts")}>
                    <p className="text-sm text-muted-foreground">Defensa personal, Aikido, Kuk Sool Won</p>
                  </CvSection>

                  {/* FORMACIÓ ACADÈMICA */}
                  <CvSection title={t("actress.cvEducation")}>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Graduada tècnica Meisner</li>
                      <li>• Màster en Teatreteràpia - ISEP</li>
                      <li>• Llicenciatura en Psicologia - UAB</li>
                    </ul>
                  </CvSection>

                  {/* IDIOMES */}
                  <CvSection title={t("actress.cvLanguages")}>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• {t("actress.cvLanguagesDetail")}</li>
                      <li>• {t("actress.cvDrivingDetail")}</li>
                    </ul>
                  </CvSection>
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
