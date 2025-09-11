"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// import { toast } from "sonner";

import {
  getVehiclesAction,
  getVehicleAction,
  createVehicleAction,
  updateVehicleAction,
  deleteVehicleAction,
  addVehiclePhotoAction,
  removeVehiclePhotoAction,
} from "../actions/vehicles";
import {
  Vehicle,
  CreateVehicleValues,
  VehicleQueryValues,
  VehiclePhotoValues,
} from "../schemas/vehicles";

export const useVehicles = (query: Partial<VehicleQueryValues> = {}) => {
  // Query para buscar veículos com paginação e filtros
  const {
    data: vehiclesData,
    isLoading: isLoadingVehicles,
    error: vehiclesError,
    refetch: refetchVehicles,
  } = useQuery({
    queryKey: ["vehicles", query],
    queryFn: async () => {
      const result = await getVehiclesAction(query);
      if (!result.success) {
        throw new Error(result.error || "Erro ao carregar veículos");
      }
      return {
        vehicles: result.data,
        pagination: result.pagination,
      };
    },
    staleTime: 30 * 1000, // 30 segundos
    refetchOnWindowFocus: false, // Evita refetch automático ao focar janela
  });

  return {
    vehicles: (vehiclesData?.vehicles as Vehicle[]) || [],
    pagination: vehiclesData?.pagination,
    isLoading: isLoadingVehicles,
    error: vehiclesError,
    refetch: refetchVehicles,
  };
};

export const useVehicle = (id: string | null) => {
  // Query para buscar um ve�culo espec�fico
  const {
    data: vehicle,
    isLoading: isLoadingVehicle,
    error: vehicleError,
  } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: async () => {
      if (!id) return null;
      const result = await getVehicleAction(id);
      if (!result.success) {
        throw new Error(result.error || "Erro ao carregar ve�culo");
      }
      return result.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  return {
    vehicle,
    isLoading: isLoadingVehicle,
    error: vehicleError,
  };
};

export const useVehicleActions = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Mutation para criar ve�culo
  const createVehicleMutation = useMutation({
    mutationFn: async (data: CreateVehicleValues) => {
      const result = await createVehicleAction(data);
      if (!result.success) {
        throw new Error(result.error || "Erro ao criar ve�culo");
      }
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      console.log("Veículo criado com sucesso!");
      if (data && data.id) {
        router.push(`/vehicles/${data.id}`);
      }
    },
    onError: (error: Error) => {
      console.error("Erro:", error.message);
    },
  });

  // Mutation para atualizar ve�culo
  const updateVehicleMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateVehicleValues>;
    }) => {
      const result = await updateVehicleAction(id, data);
      if (!result.success) {
        throw new Error(result.error || "Erro ao atualizar ve�culo");
      }
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      if (data && data.id) {
        queryClient.invalidateQueries({ queryKey: ["vehicle", data.id] });
      }
      console.log("Ve�culo atualizado com sucesso!");
    },
    onError: (error: Error) => {
      console.error("Erro:", error.message);
    },
  });

  // Mutation para deletar ve�culo
  const deleteVehicleMutation = useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteVehicleAction(id);
      if (!result.success) {
        throw new Error(result.error || "Erro ao deletar ve�culo");
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      console.log("Ve�culo deletado com sucesso!");
      router.push("/vehicles");
    },
    onError: (error: Error) => {
      console.error("Erro:", error.message);
    },
  });

  // Mutation para adicionar foto
  const addPhotoMutation = useMutation({
    mutationFn: async ({
      vehicleId,
      data,
    }: {
      vehicleId: string;
      data: VehiclePhotoValues;
    }) => {
      const result = await addVehiclePhotoAction(vehicleId, data);
      if (!result.success) {
        throw new Error(result.error || "Erro ao adicionar foto");
      }
      return result.data;
    },
    onSuccess: (_, { vehicleId }) => {
      queryClient.invalidateQueries({ queryKey: ["vehicle", vehicleId] });
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      console.log("Foto adicionada com sucesso!");
    },
    onError: (error: Error) => {
      console.error("Erro:", error.message);
    },
  });

  // Mutation para remover foto
  const removePhotoMutation = useMutation({
    mutationFn: async (photoId: string) => {
      const result = await removeVehiclePhotoAction(photoId);
      if (!result.success) {
        throw new Error(result.error || "Erro ao remover foto");
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      // Invalidar todas as queries de ve�culos para atualizar as fotos
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "vehicle",
      });
      console.log("Foto removida com sucesso!");
    },
    onError: (error: Error) => {
      console.error("Erro:", error.message);
    },
  });

  return {
    // Estados de loading
    isCreating: createVehicleMutation.isPending,
    isUpdating: updateVehicleMutation.isPending,
    isDeleting: deleteVehicleMutation.isPending,
    isAddingPhoto: addPhotoMutation.isPending,
    isRemovingPhoto: removePhotoMutation.isPending,

    // A��es
    createVehicle: createVehicleMutation.mutate,
    updateVehicle: updateVehicleMutation.mutate,
    deleteVehicle: deleteVehicleMutation.mutate,
    addPhoto: addPhotoMutation.mutate,
    removePhoto: removePhotoMutation.mutate,

    // Erros
    createError: createVehicleMutation.error?.message,
    updateError: updateVehicleMutation.error?.message,
    deleteError: deleteVehicleMutation.error?.message,
    addPhotoError: addPhotoMutation.error?.message,
    removePhotoError: removePhotoMutation.error?.message,
  };
};
