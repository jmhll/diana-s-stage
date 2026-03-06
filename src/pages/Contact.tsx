import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";
import { Send, MessageCircle, Mail, Phone, Instagram, Facebook, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — will integrate with Supabase in Phase 2
    toast({
      title: t("contact.success"),
    });
    setFormData({ name: "", surname: "", phone: "", email: "", subject: "", description: "" });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola Diana! Em dic ${formData.name} ${formData.surname}. ${formData.subject ? `Assumpte: ${formData.subject}` : ""}`
    );
    window.open(`https://wa.me/34600000000?text=${message}`, "_blank");
  };

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
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
          {/* Form */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("contact.name")} *</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder={t("contact.namePlaceholder")} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="surname">{t("contact.surname")} *</Label>
                        <Input id="surname" name="surname" value={formData.surname} onChange={handleChange} placeholder={t("contact.surnamePlaceholder")} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("contact.phone")}</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder={t("contact.phonePlaceholder")} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("contact.email")} *</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t("contact.emailPlaceholder")} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t("contact.subject")} *</Label>
                      <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder={t("contact.subjectPlaceholder")} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">{t("contact.description")} *</Label>
                      <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder={t("contact.descriptionPlaceholder")} rows={5} required />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button type="submit" className="flex-1">
                        <Send className="mr-2 h-4 w-4" />
                        {t("contact.send")}
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

          {/* Sidebar */}
          <div className="space-y-6">
            <ScrollReveal delay={0.2}>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {t("footer.contactInfo")}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <a href="mailto:info@dianafes.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="h-4 w-4" />
                      info@dianafes.com
                    </a>
                    <a href="tel:+34600000000" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <Phone className="h-4 w-4" />
                      +34 600 000 000
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
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                    <a
                      href="https://tiktok.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label="TikTok"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.22 8.22 0 0 0 3.76.92V6.24a4.85 4.85 0 0 1-3.76.45h-.24Z" />
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
