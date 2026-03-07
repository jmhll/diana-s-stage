import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;
type UserRole = Tables<"user_roles">;

interface UserWithRole extends Profile {
  roles: UserRole[];
}

const AdminUsers = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<UserWithRole[]>([]);

  useEffect(() => {
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
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">{t("admin.users")}</h2>

      {users.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">{t("admin.noUsers")}</p>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {(user.display_name ?? "U")[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{user.display_name}</p>
                  <p className="text-xs text-muted-foreground">{user.user_id}</p>
                </div>
                <div className="flex gap-1">
                  {user.roles.map((r) => (
                    <Badge key={r.id} variant={r.role === "admin" ? "default" : "secondary"}>
                      {r.role}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
