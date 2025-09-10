"use client";

import { LogOut } from "lucide-react";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";

export const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Header
        title="Dashboard"
        subtitle="Visualização geral do sistema"
        content={
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut size={16} />
            Sair
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Bem-vindo
            {user?.name}
          </h1>
        </div>
      </div>
    </>
  );
};
