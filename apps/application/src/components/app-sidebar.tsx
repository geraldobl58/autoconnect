"use client";

import { LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";

import { useAuth } from "@/features/auth/hooks/use-auth";

import { AppSidebarLinks } from "./app-sidebar-links";

import { Button } from "./ui/button";

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
              <p className="text-xs">
                Seja bem-vindo, <span className="font-bold">{user.name}</span>!
              </p>
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
