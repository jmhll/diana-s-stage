ALTER TABLE public.social_links DROP CONSTRAINT social_links_platform_check;
ALTER TABLE public.social_links ADD CONSTRAINT social_links_platform_check CHECK (platform IN ('instagram', 'facebook', 'youtube', 'linkedin', 'tiktok'));
UPDATE public.social_links SET platform = 'youtube', url = 'https://youtube.com/' WHERE platform = 'tiktok';