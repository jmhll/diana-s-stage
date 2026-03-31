import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Calendar, Mail, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DailyVisit {
  date: string;
  visits: number;
}

const Overview = () => {
  const { t } = useTranslation();
  const [counts, setCounts] = useState({ gallery: 0, events: 0, messages: 0 });
  const [dailyVisits, setDailyVisits] = useState<DailyVisit[]>([]);
  const [totalVisits, setTotalVisits] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const [g, e, m] = await Promise.all([
        supabase.from("gallery_items").select("id", { count: "exact", head: true }),
        supabase.from("events").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        gallery: g.count ?? 0,
        events: e.count ?? 0,
        messages: m.count ?? 0,
      });
    };

    const fetchVisits = async () => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data } = await supabase
        .from("page_views")
        .select("visited_at")
        .gte("visited_at", thirtyDaysAgo.toISOString())
        .order("visited_at", { ascending: true });

      if (data) {
        setTotalVisits(data.length);

        // Group by day
        const grouped: Record<string, number> = {};
        for (let i = 0; i < 30; i++) {
          const d = new Date();
          d.setDate(d.getDate() - (29 - i));
          const key = d.toISOString().split("T")[0];
          grouped[key] = 0;
        }
        data.forEach((row) => {
          const key = row.visited_at.split("T")[0];
          if (grouped[key] !== undefined) grouped[key]++;
        });

        setDailyVisits(
          Object.entries(grouped).map(([date, visits]) => ({
            date: new Date(date).toLocaleDateString(undefined, { day: "2-digit", month: "short" }),
            visits,
          }))
        );
      }
    };

    fetchCounts();
    fetchVisits();
  }, []);

  const stats = [
    { icon: Image, label: t("admin.gallery"), value: counts.gallery, color: "text-primary" },
    { icon: Calendar, label: t("admin.events"), value: counts.events, color: "text-secondary" },
    { icon: Mail, label: t("admin.messages"), value: counts.messages, color: "text-destructive" },
    { icon: TrendingUp, label: t("admin.totalVisits"), value: totalVisits, color: "text-emerald-500" },
  ];

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        {t("admin.overview")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            {t("admin.trafficTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyVisits}>
                <defs>
                  <linearGradient id="visitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#visitGradient)"
                  name={t("admin.visits")}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
