import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";
import { Calendar, MapPin, Tag } from "lucide-react";

const placeholderEvents = [
  { title: "Monòleg 'Llum i Ombra'", date: "2026-04-15", location: "Teatre Lliure, Barcelona", type: "show" },
  { title: "Gala Premis Arts Escèniques", date: "2026-05-02", location: "Palau de la Música, Barcelona", type: "presentation" },
  { title: "Taller de Comunicació Escènica", date: "2026-05-20", location: "Centre Cívic Cotxeres, Barcelona", type: "training" },
  { title: "Festival Temporada Alta", date: "2026-06-10", location: "Teatre Municipal, Girona", type: "show" },
  { title: "Jornada de Formació Empresarial", date: "2026-07-05", location: "Hotel Arts, Barcelona", type: "training" },
];

const typeColors: Record<string, string> = {
  show: "bg-primary/15 text-primary",
  presentation: "bg-secondary/20 text-secondary-foreground",
  training: "bg-muted text-muted-foreground",
};

const Agenda = () => {
  const { t } = useTranslation();

  return (
    <div className="py-12">
      <section className="relative py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
              {t("agenda.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {t("agenda.subtitle")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-4">
          {placeholderEvents.map((event, i) => {
            const date = new Date(event.date);
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <Card className="border border-border hover:border-primary/30 transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Date block */}
                      <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-primary text-primary-foreground flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold leading-none">{date.getDate()}</span>
                        <span className="text-xs uppercase mt-1">
                          {date.toLocaleDateString("ca", { month: "short" })}
                        </span>
                        <span className="text-xs opacity-70">{date.getFullYear()}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                          {event.title}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {event.location}
                          </span>
                          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[event.type]}`}>
                            <Tag className="h-3 w-3" />
                            {t(`agenda.${event.type}`)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Agenda;
