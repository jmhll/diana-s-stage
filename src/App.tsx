import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Actress from "./pages/Actress";
import Presenter from "./pages/Presenter";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Agenda from "./pages/Agenda";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Overview from "./pages/admin/Overview";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminUsers from "./pages/admin/AdminUsers";
import "./i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
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
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin", "gestor"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<Overview />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="events" element={<AdminEvents />} />
              <Route
                path="messages"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminMessages />
                  </ProtectedRoute>
                }
              />
              <Route path="settings" element={<AdminSettings />} />
              <Route
                path="users"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
