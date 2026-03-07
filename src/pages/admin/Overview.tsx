import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Calendar, Mail, Briefcase } from "lucide-react";

const Overview = () => {
  const { t } = useTranslation();
  const [counts, setCounts] = useState({ gallery: 0, events: 0, messages: 0, services: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      const [g, e, m, s] = await Promise.all([
        supabase.from("gallery_items").select("id", { count: "exact", head: true }),
        supabase.from("events").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
        supabase.from("services").select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        gallery: g.count ?? 0,
        events: e.count ?? 0,
        messages: m.count ?? 0,
        services: s.count ?? 0,
      });
    };
    fetchCounts();
  }, []);

  const stats = [
    { icon: Image, label: t("admin.gallery"), value: counts.gallery, color: "text-primary" },
    { icon: Calendar, label: t("admin.events"), value: counts.events, color: "text-secondary" },
    { icon: Mail, label: t("admin.messages"), value: counts.messages, color: "text-destructive" },
    { icon: Briefcase, label: t("nav.services"), value: counts.services, color: "text-muted-foreground" },
  ];

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        {t("admin.overview")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <s.icon className={`h-4 w-4 ${s.color}`} />
                {s.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Overview;
