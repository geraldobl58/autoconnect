"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../features/auth/hooks/use-auth";

interface UseAuthGuardOptions {
  redirectTo?: string;
  requireAuth?: boolean;
}

export const useAuthGuard = ({
  redirectTo = "/login",
  requireAuth = true,
}: UseAuthGuardOptions = {}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Aguardar carregamento

    if (requireAuth && !isAuthenticated) {
      console.log("Usuário não autenticado, redirecionando para:", redirectTo);
      router.push(redirectTo);
    } else if (!requireAuth && isAuthenticated) {
      console.log("Usuário já autenticado, redirecionando para dashboard");
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router, redirectTo, requireAuth]);

  return {
    isAuthenticated,
    isLoading,
    user,
    canRender: requireAuth ? isAuthenticated : true,
  };
};
