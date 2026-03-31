import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const usePageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Don't track admin pages
    if (location.pathname.startsWith("/admin")) return;

    supabase.from("page_views").insert({
      path: location.pathname,
      referrer: document.referrer || null,
    }).then();
  }, [location.pathname]);
};

export default usePageViewTracker;
