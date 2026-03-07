import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const AdminSettings = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({ corporate_email: "", whatsapp_number: "" });
  const [socials, setSocials] = useState<Record<string, string>>({
    instagram: "",
    facebook: "",
    tiktok: "",
    linkedin: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: siteData } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
      if (siteData) {
        setSettings({
          corporate_email: siteData.corporate_email ?? "",
          whatsapp_number: siteData.whatsapp_number ?? "",
        });
      }
      const { data: socialData } = await supabase.from("social_links").select("*");
      if (socialData) {
        const map: Record<string, string> = {};
        socialData.forEach((s) => { map[s.platform] = s.url; });
        setSocials((prev) => ({ ...prev, ...map }));
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    // Update site settings
    const { error: settingsError } = await supabase
      .from("site_settings")
      .update({
        corporate_email: settings.corporate_email,
        whatsapp_number: settings.whatsapp_number,
      })
      .neq("id", "00000000-0000-0000-0000-000000000000"); // update all rows

    // Update social links
    for (const [platform, url] of Object.entries(socials)) {
      await supabase
        .from("social_links")
        .update({ url })
        .eq("platform", platform);
    }

    setLoading(false);
    if (settingsError) {
      toast({ title: t("common.error"), description: settingsError.message, variant: "destructive" });
    } else {
      toast({ title: t("admin.settingsSaved") });
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">{t("admin.settings")}</h2>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("admin.contactSettings")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t("admin.corporateEmail")}</Label>
              <Input
                type="email"
                value={settings.corporate_email}
                onChange={(e) => setSettings((p) => ({ ...p, corporate_email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("admin.whatsappNumber")}</Label>
              <Input
                value={settings.whatsapp_number}
                onChange={(e) => setSettings((p) => ({ ...p, whatsapp_number: e.target.value }))}
                placeholder="+34600000000"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("admin.socialLinks")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {["instagram", "facebook", "tiktok", "linkedin"].map((platform) => (
              <div key={platform} className="space-y-2">
                <Label className="capitalize">{platform}</Label>
                <Input
                  value={socials[platform] ?? ""}
                  onChange={(e) => setSocials((p) => ({ ...p, [platform]: e.target.value }))}
                  placeholder={`https://${platform}.com/...`}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Button onClick={handleSave} disabled={loading} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          {loading ? t("common.loading") : t("admin.save")}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
