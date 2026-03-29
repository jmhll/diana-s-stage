import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Image,
  Calendar,
  Mail,
  Settings,
  Users,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  UserCircle,
  Briefcase,
} from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Dashboard = () => {
  const { t } = useTranslation();
  const { role, signOut, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const navItems = [
    { to: "/admin", icon: LayoutDashboard, label: t("admin.overview"), exact: true },
    { to: "/admin/gallery", icon: Image, label: t("admin.gallery") },
    { to: "/admin/events", icon: Calendar, label: t("admin.events") },
    { to: "/admin/services", icon: Briefcase, label: t("admin.services") },
    ...(role === "admin"
      ? [
          { to: "/admin/messages", icon: Mail, label: t("admin.messages") },
          { to: "/admin/users", icon: Users, label: t("admin.users") },
        ]
      : []),
    { to: "/admin/settings", icon: Settings, label: t("admin.settings") },
  ];

  const isActive = (path: string, exact?: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex bg-muted/20">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Fes Diana" className="h-8" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.to, (item as any).exact)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <div className="px-3 py-2 text-xs text-muted-foreground mb-2 truncate">
            {user?.email}
            <span className={`ml-1 px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold ${
              role === "admin" ? "bg-primary/10 text-primary" : "bg-secondary/20 text-secondary"
            }`}>
              {role}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-muted-foreground"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            {t("admin.logout")}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="font-display text-lg font-semibold text-foreground">
            {t("admin.panel")}
          </h1>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
