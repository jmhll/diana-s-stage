import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { Brain, Compass, GraduationCap, ArrowRight } from "lucide-react";

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Brain,
      title: t("services.psychology"),
      description: t("services.psychologyDesc"),
      items: [t("services.psychologyOnline"), t("services.psychologyPresential")],
      color: "from-primary/20 to-primary/5",
    },
    {
      icon: Compass,
      title: t("services.career"),
      description: t("services.careerDesc"),
      items: [t("services.careerAdvice")],
      color: "from-secondary/20 to-secondary/5",
    },
    {
      icon: GraduationCap,
      title: t("services.training"),
      description: t("services.trainingDesc"),
      items: [t("services.trainingCompanies"), t("services.trainingWorkshops"), t("services.trainingDevelopment")],
      color: "from-primary/15 to-secondary/10",
    },
  ];

  return (
    <div className="py-12">
      <section className="relative py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
              {t("services.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {t("services.subtitle")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 flex-1">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="mt-auto group">
                    <Link to="/contacte">
                      {t("services.learnMore")}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
