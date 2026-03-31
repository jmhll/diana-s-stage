
CREATE TABLE public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  visited_at timestamp with time zone NOT NULL DEFAULT now(),
  referrer text
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Anyone can insert page views (public tracking)
CREATE POLICY "Anyone can insert page views"
  ON public.page_views FOR INSERT
  TO public
  WITH CHECK (true);

-- Only admins can read page views
CREATE POLICY "Admins can view page views"
  ON public.page_views FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
