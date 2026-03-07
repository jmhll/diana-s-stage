import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Calendar } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Event = Tables<"events">;

const AdminEvents = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    event_type: "espectacle" as string,
  });

  const fetchEvents = async () => {
    const { data } = await supabase.from("events").select("*").order("date", { ascending: true });
    if (data) setEvents(data);
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleAdd = async () => {
    if (!form.title || !form.date) return;
    setLoading(true);
    const { error } = await supabase.from("events").insert({
      title: form.title,
      description: form.description || null,
      date: form.date,
      location: form.location || null,
      event_type: form.event_type,
    });
    setLoading(false);
    if (error) {
      toast({ title: t("common.error"), description: error.message, variant: "destructive" });
    } else {
      toast({ title: t("admin.itemAdded") });
      setForm({ title: "", description: "", date: "", location: "", event_type: "espectacle" });
      setOpen(false);
      fetchEvents();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
      toast({ title: t("admin.itemDeleted") });
    }
  };

  const eventTypeLabels: Record<string, string> = {
    espectacle: t("agenda.show"),
    presentacio: t("agenda.presentation"),
    formacio: t("agenda.training"),
    altre: t("admin.other"),
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">{t("admin.events")}</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />{t("admin.add")}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("admin.addEvent")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t("admin.titleField")}</Label>
                <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>{t("contact.description")}</Label>
                <Textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("admin.date")}</Label>
                  <Input type="datetime-local" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>{t("agenda.location")}</Label>
                  <Input value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t("agenda.type")}</Label>
                <Select value={form.event_type} onValueChange={(v) => setForm((p) => ({ ...p, event_type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="espectacle">{t("agenda.show")}</SelectItem>
                    <SelectItem value="presentacio">{t("agenda.presentation")}</SelectItem>
                    <SelectItem value="formacio">{t("agenda.training")}</SelectItem>
                    <SelectItem value="altre">{t("admin.other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAdd} disabled={loading} className="w-full">
                {loading ? t("common.loading") : t("admin.add")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {events.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">{t("admin.noItems")}</p>
      ) : (
        <div className="space-y-3">
          {events.map((event) => {
            const d = new Date(event.date);
            return (
              <Card key={event.id} className="group">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-primary/10 flex flex-col items-center justify-center text-primary">
                    <span className="text-lg font-bold leading-none">{d.getDate()}</span>
                    <span className="text-[10px] uppercase">{d.toLocaleDateString("ca", { month: "short" })}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.location} · {eventTypeLabels[event.event_type] ?? event.event_type}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 text-destructive"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
