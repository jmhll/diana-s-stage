import { useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";
import { Send, MessageCircle, Mail, Phone, Instagram, Facebook, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    subject: "",
    description: "",
  });
  const [sending, setSending] = useState(false);

  const { data: siteSettings } = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
      return data;
    },
  });

  const { data: socialLinks } = useQuery({
    queryKey: ["social_links"],
    queryFn: async () => {
      const { data } = await supabase.from("social_links").select("*");
      return data ?? [];
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: formData.name,
      surname: formData.surname,
      phone: formData.phone || null,
      email: formData.email,
      subject: formData.subject,
      description: formData.description,
    });

    if (error) {
      setSending(false);
      toast({ title: t("contact.error"), variant: "destructive" });
      return;
    }

    // Send email notification to corporate email
    try {
      await supabase.functions.invoke("send-contact-notification", {
        body: {
          name: formData.name,
          surname: formData.surname,
          phone: formData.phone,
          email: formData.email,
          subject: formData.subject,
          description: formData.description,
          corporateEmail: siteSettings?.corporate_email ?? "info@dianafes.com",
        },
      });
    } catch (emailErr) {
      console.error("Email notification failed:", emailErr);
    }

    setSending(false);
    toast({ title: t("contact.success") });
    setFormData({ name: "", surname: "", phone: "", email: "", subject: "", description: "" });
  };

  const handleWhatsApp = () => {
    const number = siteSettings?.whatsapp_number?.replace(/[^0-9]/g, "") ?? "34600000000";
    const message = encodeURIComponent(
      `Hola! Em dic ${formData.name} ${formData.surname}. ${formData.subject ? `Assumpte: ${formData.subject}` : ""}`
    );
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  };

  const getSocialUrl = (platform: string) =>
    socialLinks?.find((s) => s.platform === platform)?.url ?? "#";

  const corporateEmail = siteSettings?.corporate_email ?? "info@dianafes.com";
  const whatsappDisplay = siteSettings?.whatsapp_number ?? "+34 600 000 000";

  const socialIcons = [
    { icon: Instagram, platform: "instagram", label: "Instagram" },
    { icon: Facebook, platform: "facebook", label: "Facebook" },
    { icon: Linkedin, platform: "linkedin", label: "LinkedIn" },
  ];

  return (
    <div className="py-12">
      <section className="relative py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
              {t("contact.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2">
            <ScrollReveal>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("contact.name")} *</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder={t("contact.namePlaceholder")} required maxLength={100} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="surname">{t("contact.surname")} *</Label>
                        <Input id="surname" name="surname" value={formData.surname} onChange={handleChange} placeholder={t("contact.surnamePlaceholder")} required maxLength={100} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("contact.phone")}</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder={t("contact.phonePlaceholder")} maxLength={20} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("contact.email")} *</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t("contact.emailPlaceholder")} required maxLength={255} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t("contact.subject")} *</Label>
                      <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder={t("contact.subjectPlaceholder")} required maxLength={200} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">{t("contact.description")} *</Label>
                      <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder={t("contact.descriptionPlaceholder")} rows={5} required maxLength={2000} />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button type="submit" className="flex-1" disabled={sending}>
                        <Send className="mr-2 h-4 w-4" />
                        {sending ? t("common.loading") : t("contact.send")}
                      </Button>
                      <Button type="button" variant="outline" onClick={handleWhatsApp} className="flex-1 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {t("contact.whatsapp")}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          <div className="space-y-6">
            <ScrollReveal delay={0.2}>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {t("footer.contactInfo")}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <a href={`mailto:${corporateEmail}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="h-4 w-4" />
                      {corporateEmail}
                    </a>
                    <a href={`tel:${whatsappDisplay}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <Phone className="h-4 w-4" />
                      {whatsappDisplay}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    {t("footer.followMe")}
                  </h3>
                  <div className="flex gap-3">
                    {socialIcons.map((social) => (
                      <a
                        key={social.label}
                        href={getSocialUrl(social.platform)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                    <a
                      href={getSocialUrl("youtube")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label="YouTube"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
