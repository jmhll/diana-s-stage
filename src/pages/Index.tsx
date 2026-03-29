import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Camera, Mic, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  const { t } = useTranslation();

  const { data: events = [] } = useQuery({
    queryKey: ["events_home"],
    queryFn: async () => {
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .gte("date", new Date().toISOString())
        .order("date", { ascending: true })
        .limit(3);
      return data ?? [];
    },
  });

  const typeLabels: Record<string, string> = {
    espectacle: t("agenda.show"),
    presentacio: t("agenda.presentation"),
    formacio: t("agenda.training"),
    altre: "Altre",
  };

  const portfolioCards = [
    {
      icon: Camera,
      title: t("nav.actress"),
      description: t("actress.subtitle"),
      to: "/actriu",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    },
    {
      icon: Mic,
      title: t("nav.presenter"),
      description: t("presenter.subtitle"),
      to: "/presentadora",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop",
    },
    {
      icon: BookOpen,
      title: t("nav.services"),
      description: t("services.subtitle"),
      to: "/serveis",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/hero-diana.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-6xl md:text-8xl font-bold text-primary-foreground mb-4 tracking-wide"
          >
            {t("home.heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-primary-foreground/90 font-light mb-3"
          >
            {t("home.heroSubtitle")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-primary-foreground/70 mb-8 max-w-xl mx-auto"
          >
            {t("home.heroDescription")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base px-8 py-6 rounded-full font-semibold"
            >
              <Link to="/contacte">
                {t("home.heroCta")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t("home.aboutTitle")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("home.aboutText")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Portfolio Cards */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-foreground mb-12">
              {t("home.portfolioTitle")}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioCards.map((card, index) => (
              <ScrollReveal key={card.to} delay={index * 0.15}>
                <Link to={card.to} className="group block">
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/30 transition-colors" />
                      <div className="absolute bottom-4 left-4">
                        <card.icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                        {card.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{card.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-foreground mb-12">
              {t("home.eventsTitle")}
            </h2>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto space-y-4">
            {events.length === 0 ? (
              <p className="text-center text-muted-foreground">{t("home.noEvents")}</p>
            ) : (
              events.map((event, index) => (
                <ScrollReveal key={event.id} delay={index * 0.1}>
                  <Card className="border border-border hover:border-primary/30 transition-colors">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-xl font-semibold text-foreground">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()} · {event.location}
                        </p>
                      </div>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground">
                        {typeLabels[event.event_type] ?? event.event_type}
                      </span>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))
            )}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/agenda">
                {t("common.viewMore")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
