import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Play } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type GalleryItem = Tables<"gallery_items">;

const AdminGallery = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "foto" as string,
    category: "actriu" as string,
    media_url: "",
  });

  const fetchItems = async () => {
    const { data } = await supabase
      .from("gallery_items")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data) setItems(data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleAdd = async () => {
    if (!form.title || !form.media_url) return;
    setLoading(true);
    const { error } = await supabase.from("gallery_items").insert({
      title: form.title,
      description: form.description || null,
      type: form.type,
      category: form.category,
      media_url: form.media_url,
    });
    setLoading(false);
    if (error) {
      toast({ title: t("common.error"), description: error.message, variant: "destructive" });
    } else {
      toast({ title: t("admin.itemAdded") });
      setForm({ title: "", description: "", type: "foto", category: "actriu", media_url: "" });
      setOpen(false);
      fetchItems();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("gallery_items").delete().eq("id", id);
    if (!error) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast({ title: t("admin.itemDeleted") });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop();
    const path = `gallery/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) {
      toast({ title: t("common.error"), description: error.message, variant: "destructive" });
      return;
    }
    const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
    setForm((prev) => ({ ...prev, media_url: urlData.publicUrl }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">{t("admin.gallery")}</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />{t("admin.add")}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("admin.addGalleryItem")}</DialogTitle>
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
                  <Label>{t("admin.type")}</Label>
                  <Select value={form.type} onValueChange={(v) => setForm((p) => ({ ...p, type: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="foto">{t("gallery.photos")}</SelectItem>
                      <SelectItem value="video">{t("gallery.videos")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t("admin.category")}</Label>
                  <Select value={form.category} onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="actriu">{t("gallery.actressCategory")}</SelectItem>
                      <SelectItem value="presentadora">{t("gallery.presenterCategory")}</SelectItem>
                      <SelectItem value="serveis">{t("nav.services")}</SelectItem>
                      
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t("admin.mediaFile")}</Label>
                <Input type="file" accept="image/*,video/*" onChange={handleFileUpload} />
                {form.media_url && (
                  <p className="text-xs text-muted-foreground truncate">{form.media_url}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>{t("admin.mediaUrl")}</Label>
                <Input
                  value={form.media_url}
                  onChange={(e) => setForm((p) => ({ ...p, media_url: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
              <Button onClick={handleAdd} disabled={loading} className="w-full">
                {loading ? t("common.loading") : t("admin.add")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">{t("admin.noItems")}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden group relative">
              <div className="aspect-square bg-muted relative">
                {item.type === "video" ? (
                  <>
                    <video
                      src={item.media_url}
                      className="w-full h-full object-cover"
                      muted
                      preload="metadata"
                      onLoadedData={(e) => {
                        e.currentTarget.currentTime = 1;
                      }}
                      onClick={(e) => {
                        const vid = e.currentTarget;
                        const overlay = vid.nextElementSibling as HTMLElement;
                        if (vid.paused) {
                          vid.controls = true;
                          vid.muted = false;
                          vid.play();
                          if (overlay) overlay.style.display = "none";
                        } else {
                          vid.pause();
                          vid.controls = false;
                          if (overlay) overlay.style.display = "flex";
                        }
                      }}
                      onPause={(e) => {
                        const overlay = e.currentTarget.nextElementSibling as HTMLElement;
                        if (overlay) overlay.style.display = "flex";
                        e.currentTarget.controls = false;
                      }}
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      onClick={(e) => {
                        const vid = (e.currentTarget.previousElementSibling) as HTMLVideoElement;
                        vid.controls = true;
                        vid.muted = false;
                        vid.play();
                        e.currentTarget.style.display = "none";
                      }}
                    >
                      <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm">
                        <Play className="h-5 w-5 text-white ml-0.5" />
                      </div>
                    </div>
                  </>
                ) : (
                  <img src={item.media_url} alt={item.title} className="w-full h-full object-cover" />
                )}
              </div>
              <CardContent className="p-3">
                <p className="text-sm font-medium truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.category} · {item.type}</p>
              </CardContent>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
