"use server";

import { vehiclesService } from "../services/vehicles.service";
import {
  CreateVehicleValues,
  VehicleQueryValues,
  VehiclePhotoValues,
} from "../schemas/vehicles";
import { Vehicle, VehiclePhoto } from "../types";

export interface VehiclesResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export async function getVehiclesAction(
  query: Partial<VehicleQueryValues> = {}
): Promise<VehiclesResult<Vehicle[]>> {
  try {
    const response = await vehiclesService.getVehicles(
      query as VehicleQueryValues
    );

    return {
      success: true,
      data: response.data,
      pagination: response.pagination,
    };
  } catch (error: unknown) {
    console.error("Erro ao buscar veículos:", error);

    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: { status?: number; data?: unknown };
      };

      if (axiosError.response?.status === 401) {
        return {
          success: false,
          error: "Não autorizado. Faça login novamente.",
        };
      }

      if (axiosError.response?.status === 403) {
        return {
          success: false,
          error: "Acesso negado. Você não tem permissão para ver os veículos.",
        };
      }
    }

    return {
      success: false,
      error: "Erro interno do servidor. Tente novamente.",
    };
  }
}

export async function getVehicleAction(
  id: string
): Promise<VehiclesResult<Vehicle>> {
  try {
    const response = await vehiclesService.getVehicle(id);

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    console.error("Erro ao buscar veículo:", error);

    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response?: { status?: number } };

      if (axiosError.response?.status === 404) {
        return {
          success: false,
          error: "Veículo não encontrado.",
        };
      }

      if (axiosError.response?.status === 401) {
        return {
          success: false,
          error: "Não autorizado. Faça login novamente.",
        };
      }
    }

    return {
      success: false,
      error: "Erro ao carregar veículo. Tente novamente.",
    };
  }
}

export async function createVehicleAction(
  data: CreateVehicleValues
): Promise<VehiclesResult<Vehicle>> {
  try {
    const response = await vehiclesService.createVehicle(data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    console.error("Erro ao criar veículo:", error);

    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: { status?: number; data?: unknown };
      };

      if (axiosError.response?.status === 401) {
        return {
          success: false,
          error: "Não autorizado. Faça login novamente.",
        };
      }

      if (axiosError.response?.status === 403) {
        return {
          success: false,
          error: "Acesso negado. Apenas administradores podem criar veículos.",
        };
      }

      if (axiosError.response?.status === 400) {
        return {
          success: false,
          error: "Dados inválidos fornecidos.",
        };
      }
    }

    return {
      success: false,
      error: "Erro ao criar veículo. Tente novamente.",
    };
  }
}

export async function updateVehicleAction(
  id: string,
  data: Partial<CreateVehicleValues>
): Promise<VehiclesResult<Vehicle>> {
  try {
    const response = await vehiclesService.updateVehicle(id, data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    console.error("Erro ao atualizar veículo:", error);

    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response?: { status?: number } };

      if (axiosError.response?.status === 404) {
        return {
          success: false,
          error: "Veículo não encontrado.",
        };
      }

      if (axiosError.response?.status === 401) {
        return {
          success: false,
          error: "Não autorizado. Faça login novamente.",
        };
      }

      if (axiosError.response?.status === 403) {
        return {
          success: false,
          error:
            "Acesso negado. Apenas administradores podem atualizar veículos.",
        };
      }
    }

    return {
      success: false,
      error: "Erro ao atualizar veículo. Tente novamente.",
    };
  }
}

export async function deleteVehicleAction(
  id: string
): Promise<VehiclesResult<Vehicle>> {
  try {
    const response = await vehiclesService.deleteVehicle(id);

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    console.error("Erro ao deletar veículo:", error);

    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response?: { status?: number } };

      if (axiosError.response?.status === 404) {
        return {
          success: false,
          error: "Veículo não encontrado.",
        };
      }

      if (axiosError.response?.status === 401) {
        return {
          success: false,
          error: "Não autorizado. Faça login novamente.",
        };
      }

      if (axiosError.response?.status === 403) {
        return {
          success: false,
          error:
            "Acesso negado. Apenas administradores podem deletar veículos.",
        };
      }
    }

    return {
      success: false,
      error: "Erro ao deletar veículo. Tente novamente.",
    };
  }
}

export async function addVehiclePhotoAction(
  vehicleId: string,
  data: VehiclePhotoValues
): Promise<VehiclesResult<VehiclePhoto>> {
  try {
    const response = await vehiclesService.addVehiclePhoto(vehicleId, data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    console.error("Erro ao adicionar foto:", error);

    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response?: { status?: number } };

      if (axiosError.response?.status === 404) {
        return {
          success: false,
          error: "Veículo não encontrado.",
        };
      }

      if (axiosError.response?.status === 401) {
        return {
          success: false,
          error: "Não autorizado. Faça login novamente.",
        };
      }

      if (axiosError.response?.status === 403) {
        return {
          success: false,
          error: "Acesso negado. Apenas administradores podem adicionar fotos.",
        };
      }
    }

    return {
      success: false,
      error: "Erro ao adicionar foto. Tente novamente.",
    };
  }
}

export async function removeVehiclePhotoAction(
  photoId: string
): Promise<VehiclesResult<VehiclePhoto>> {
  try {
    const response = await vehiclesService.removeVehiclePhoto(photoId);

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    console.error("Erro ao remover foto:", error);

    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response?: { status?: number } };

      if (axiosError.response?.status === 404) {
        return {
          success: false,
          error: "Foto não encontrada.",
        };
      }

      if (axiosError.response?.status === 401) {
        return {
          success: false,
          error: "Não autorizado. Faça login novamente.",
        };
      }

      if (axiosError.response?.status === 403) {
        return {
          success: false,
          error: "Acesso negado. Apenas administradores podem remover fotos.",
        };
      }
    }

    return {
      success: false,
      error: "Erro ao remover foto. Tente novamente.",
    };
  }
}
