import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Actress from "./pages/Actress";
import Presenter from "./pages/Presenter";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Agenda from "./pages/Agenda";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import "./i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/actriu" element={<Actress />} />
            <Route path="/presentadora" element={<Presenter />} />
            <Route path="/serveis" element={<Services />} />
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/contacte" element={<Contact />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
