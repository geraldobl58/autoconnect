"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, Mail, Shield, Calendar } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/use-auth";

const ApplicationPage = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
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
            {user?.name && user.name.trim() !== "" ? `, ${user.name}` : ""}!
          </h1>
        </div>

        {user && (
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="" alt={user.name || user.email} />
                  <AvatarFallback>
                    {user.name && user.name.trim() !== ""
                      ? user.name.charAt(0).toUpperCase()
                      : user.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">
                    {user.name && user.name.trim() !== ""
                      ? user.name
                      : "Usuário"}
                  </h2>
                  <p className="text-muted-foreground">Informações do perfil</p>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <User size={18} className="text-orange-600" />
                  <div>
                    <p className="text-sm font-medium">Nome</p>
                    <p className="text-sm text-muted-foreground">
                      {user.name && user.name.trim() !== ""
                        ? user.name
                        : "Nome não informado"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Mail size={18} className="text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Shield size={18} className="text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Função</p>
                    <Badge variant="secondary">
                      {user.role === "ADMIN" ? "Administrador" : "Vendedor"}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Calendar size={18} className="text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <Badge variant="default" className="bg-green-600">
                      Online
                    </Badge>
                  </div>
                </div>
              </div>

              {/* ID do usuário em seção separada */}
              <div className="pt-4 border-t">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <User size={18} className="text-gray-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">ID do usuário</p>
                    <p className="text-xs text-muted-foreground font-mono break-all">
                      {user.userId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Fazer Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!user && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Nenhum dado de usuário encontrado
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ApplicationPage;
