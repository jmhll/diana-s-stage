import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();

  const { data: socialLinks = [] } = useQuery({
    queryKey: ["social_links_footer"],
    queryFn: async () => {
      const { data } = await supabase.from("social_links").select("*");
      return data ?? [];
    },
  });

  const { data: siteSettings } = useQuery({
    queryKey: ["site_settings_footer"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
      return data;
    },
  });

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/actriu", label: t("nav.actress") },
    { to: "/presentadora", label: t("nav.presenter") },
    { to: "/serveis", label: t("nav.services") },
    { to: "/galeria", label: t("nav.gallery") },
    { to: "/agenda", label: t("nav.agenda") },
    { to: "/contacte", label: t("nav.contact") },
  ];

  const getSocialUrl = (platform: string) =>
    socialLinks.find((s) => s.platform === platform)?.url ?? "#";

  const socialIcons = [
    { icon: Instagram, platform: "instagram", label: "Instagram" },
    { icon: Facebook, platform: "facebook", label: "Facebook" },
    { icon: Linkedin, platform: "linkedin", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-2xl font-bold mb-3">Diana Fes</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {t("home.heroSubtitle")}
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-3">{t("footer.quickLinks")}</h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-3">{t("footer.followMe")}</h4>
            <div className="flex gap-3 mb-4">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={getSocialUrl(social.platform)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
              <a
                href={getSocialUrl("tiktok")}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground transition-colors"
                aria-label="TikTok"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.22 8.22 0 0 0 3.76.92V6.24a4.85 4.85 0 0 1-3.76.45h-.24Z" />
                </svg>
              </a>
            </div>
            <div className="text-sm text-primary-foreground/70">
              <p>{siteSettings?.corporate_email ?? "info@dianafes.com"}</p>
              <p>{siteSettings?.whatsapp_number ?? "+34 600 000 000"}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} Diana Fes. {t("footer.rights")}.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
