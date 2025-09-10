"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { AppSidebarLinks } from "./app-sidebar-links";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export function AppSidebar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <AppSidebarLinks />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div>
        {user && (
          <div className="bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-2">
              <p className="text-xs">Olá, {user.name}!</p>
              <Button size="icon" variant="ghost" onClick={handleLogout}>
                <LogOut />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
}
