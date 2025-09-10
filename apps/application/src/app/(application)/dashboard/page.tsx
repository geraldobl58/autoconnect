"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, Mail, Shield, Calendar } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/use-auth";

const ApplicationPage = () => {
  const { user, logout, isLoadingUser, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  console.log("Dashboard Debug:", {
    user,
    isLoadingUser,
    isAuthenticated,
    mounted,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
  };

  // Redirecionamento imediato se não estiver autenticado
  useEffect(() => {
    if (mounted && !isAuthenticated && !isLoadingUser) {
      console.log("Usuário não autenticado, redirecionando para login...");
      router.replace("/login");
      return;
    }
  }, [mounted, isAuthenticated, isLoadingUser, router]);

  // Se não está autenticado, não renderizar nada (será redirecionado)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecionando para login...</p>
        </div>
      </div>
    );
  }

  // Evitar problemas de hidratação renderizando conteúdo consistente
  if (!mounted || isLoadingUser) {
    return (
      <div>
        <Header
          title="Dashboard"
          subtitle="Carregando dados do usuário..."
          content={
            <div className="h-8 w-8 rounded-full bg-gray-300 animate-pulse" />
          }
        />
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-20 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Se o usuário ainda for undefined após carregar, mostrar erro
  if (!user) {
    return (
      <div>
        <Header
          title="Dashboard"
          subtitle="Erro ao carregar dados do usuário"
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
        <div className="p-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <p className="text-center text-muted-foreground">
                {!isAuthenticated
                  ? "Você não está logado. Redirecionando para login..."
                  : "Erro ao carregar dados do usuário. Tente fazer login novamente."}
              </p>
              <div className="text-center text-xs text-gray-400">
                Debug: hasToken={isAuthenticated ? "true" : "false"}
              </div>
              <div className="flex justify-center mt-4">
                <Button onClick={handleLogout} variant="outline">
                  Ir para Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
