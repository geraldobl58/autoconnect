"use server";

import { authService } from "../services/auth.service";
import { FormAuthValues } from "../schemas/auth";

export interface LoginResult {
  success: boolean;
  data?: {
    access_token: string;
  };
  error?: string;
}

export async function loginAction(
  credentials: FormAuthValues
): Promise<LoginResult> {
  try {
    console.log("Tentando autenticar usuário:", {
      email: credentials.email,
      // Não logar a senha por segurança
    });

    const response = await authService.login(credentials);

    return {
      success: true,
      data: {
        access_token: response.access_token,
      },
    };
  } catch (error: unknown) {
    console.error("Erro no login:", error);

    // Tratar diferentes tipos de erro
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response?: { status?: number } };

      if (axiosError.response?.status === 401) {
        return {
          success: false,
          error: "Email ou senha incorretos",
        };
      }

      if (axiosError.response?.status === 400) {
        return {
          success: false,
          error: "Dados inválidos fornecidos",
        };
      }
    }

    return {
      success: false,
      error: "Erro interno do servidor. Tente novamente.",
    };
  }
}

export async function getProfileAction() {
  try {
    console.log("getProfileAction: Chamando authService.getProfile()");
    const user = await authService.getProfile();
    console.log("getProfileAction: Usuário retornado:", user);
    return {
      success: true,
      data: user,
    };
  } catch (error: unknown) {
    console.error("Erro ao buscar perfil:", error);
    return {
      success: false,
      error: "Erro ao carregar perfil do usuário",
    };
  }
}
