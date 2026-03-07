import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, Tag } from "lucide-react";

const typeColors: Record<string, string> = {
  espectacle: "bg-primary/15 text-primary",
  presentacio: "bg-secondary/20 text-secondary-foreground",
  formacio: "bg-muted text-muted-foreground",
  altre: "bg-muted text-muted-foreground",
};

const Agenda = () => {
  const { t } = useTranslation();

  const { data: events = [] } = useQuery({
    queryKey: ["events_public"],
    queryFn: async () => {
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .gte("date", new Date().toISOString().split("T")[0])
        .order("date", { ascending: true });
      return data ?? [];
    },
  });

  const typeLabels: Record<string, string> = {
    espectacle: t("agenda.show"),
    presentacio: t("agenda.presentation"),
    formacio: t("agenda.training"),
    altre: t("admin.other"),
  };

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
          {events.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">{t("agenda.noEvents")}</p>
          ) : (
            events.map((event, i) => {
              const date = new Date(event.date);
              return (
                <ScrollReveal key={event.id} delay={i * 0.08}>
                  <Card className="border border-border hover:border-primary/30 transition-all hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
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
                          {event.description && (
                            <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                          )}
                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            {event.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                {event.location}
                              </span>
                            )}
                            <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[event.event_type] ?? ""}`}>
                              <Tag className="h-3 w-3" />
                              {typeLabels[event.event_type] ?? event.event_type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default Agenda;
