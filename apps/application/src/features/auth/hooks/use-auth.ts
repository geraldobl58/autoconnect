"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// import { toast } from "sonner"; // Comentado por enquanto
import { cookieUtils } from "@/lib/cookies";
import { loginAction, getProfileAction } from "../actions/auth";
import { FormAuthValues } from "../schemas/auth";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const hasToken = cookieUtils.hasToken();

  console.log("useAuth Debug:", {
    hasToken,
    token: cookieUtils.getToken(),
  });

  // Query para buscar o perfil do usuário - só executa se tiver token
  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryKey: ["auth", "profile"],
    queryFn: async () => {
      if (!hasToken) {
        throw new Error("Não há token disponível");
      }
      console.log("Executando getProfileAction...");
      const result = await getProfileAction();
      console.log("getProfileAction result:", result);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    enabled: hasToken, // Só busca se tiver token
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  // Mutation para fazer login
  const loginMutation = useMutation({
    mutationFn: async (credentials: FormAuthValues) => {
      const result = await loginAction(credentials);

      if (!result.success) {
        throw new Error(result.error || "Erro no login");
      }

      return result.data!;
    },
    onSuccess: (data) => {
      console.log("Login success - dados recebidos:", data);

      // Salvar token no cookie
      cookieUtils.setToken(data.access_token);
      console.log("Token salvo no cookie:", cookieUtils.getToken());

      // Invalidar queries relacionadas a auth
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      console.log("Queries invalidadas");

      console.log("Login realizado com sucesso!");

      // Redirecionar para dashboard
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Erro no login:", error);
      console.error("Erro ao fazer login:", error.message);
    },
  });

  // Função para fazer logout
  const logout = () => {
    cookieUtils.removeToken();
    queryClient.clear();
    console.log("Logout realizado com sucesso!");
    router.push("/login");
  };

  // Estados derivados
  const isAuthenticated = hasToken && !userError && user !== undefined;
  const isLoading = loginMutation.isPending || isLoadingUser;

  console.log("Estados derivados:", {
    hasToken,
    userError: !!userError,
    userExists: !!user,
    isAuthenticated,
    isLoading,
  });

  return {
    // Dados do usuário
    user,
    isAuthenticated,
    isLoading,
    isLoadingUser,

    // Funções de autenticação
    login: loginMutation.mutate,
    logout,

    // Estados das mutations
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error?.message,
  };
};
