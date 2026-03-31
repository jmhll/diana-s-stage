import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Trash2, Shield, KeyRound } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;
type UserRole = Tables<"user_roles">;

interface UserWithRole extends Profile {
  roles: UserRole[];
}

const AdminUsers = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordUserId, setPasswordUserId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [form, setForm] = useState({ email: "", password: "", display_name: "", role: "gestor" as "admin" | "gestor" });

  const fetchUsers = async () => {
    const { data: profiles } = await supabase.from("profiles").select("*");
    const { data: roles } = await supabase.from("user_roles").select("*");
    if (profiles) {
      const usersWithRoles = profiles.map((p) => ({
        ...p,
        roles: roles?.filter((r) => r.user_id === p.user_id) ?? [],
      }));
      setUsers(usersWithRoles);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreate = async () => {
    if (!form.email || !form.password) return;
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("manage-users", {
      body: { action: "create", ...form },
    });
    setLoading(false);
    if (error || data?.error) {
      toast({ title: t("common.error"), description: data?.error || error?.message, variant: "destructive" });
    } else {
      toast({ title: t("admin.userCreated") });
      setDialogOpen(false);
      setForm({ email: "", password: "", display_name: "", role: "gestor" });
      fetchUsers();
    }
  };

  const handleDelete = async (userId: string) => {
    const { data, error } = await supabase.functions.invoke("manage-users", {
      body: { action: "delete", user_id: userId },
    });
    if (error || data?.error) {
      toast({ title: t("common.error"), description: data?.error || error?.message, variant: "destructive" });
    } else {
      toast({ title: t("admin.userDeleted") });
      fetchUsers();
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    const { data, error } = await supabase.functions.invoke("manage-users", {
      body: { action: "update_role", user_id: userId, role: newRole },
    });
    if (error || data?.error) {
      toast({ title: t("common.error"), description: data?.error || error?.message, variant: "destructive" });
    } else {
      toast({ title: t("admin.roleUpdated") });
      fetchUsers();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">{t("admin.users")}</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />{t("admin.addUser")}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("admin.addUser")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t("admin.displayName")}</Label>
                <Input value={form.display_name} onChange={(e) => setForm((p) => ({ ...p, display_name: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>{t("contact.email")}</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>{t("admin.password")}</Label>
                <Input type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>{t("admin.role")}</Label>
                <Select value={form.role} onValueChange={(v) => setForm((p) => ({ ...p, role: v as "admin" | "gestor" }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="gestor">Gestor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreate} disabled={loading} className="w-full">
                {loading ? t("common.loading") : t("admin.addUser")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {users.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">{t("admin.noUsers")}</p>
      ) : (
        <div className="space-y-3">
          {users.map((user) => {
            const isCurrentUser = user.user_id === currentUser?.id;
            return (
              <Card key={user.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {(user.display_name ?? "U")[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{user.display_name}</p>
                    <p className="text-xs text-muted-foreground">{user.user_id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={user.roles[0]?.role ?? "gestor"}
                      onValueChange={(v) => handleRoleChange(user.user_id, v)}
                      disabled={isCurrentUser}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="gestor">Gestor</SelectItem>
                      </SelectContent>
                    </Select>
                    {!isCurrentUser && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{t("admin.confirmDelete")}</AlertDialogTitle>
                            <AlertDialogDescription>{t("admin.confirmDeleteUser")}</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{t("common.back")}</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(user.user_id)}>
                              {t("admin.delete")}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
