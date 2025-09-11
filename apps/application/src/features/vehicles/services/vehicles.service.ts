import api from "@/lib/api";
import {
  VehiclesResponse,
  VehicleResponse,
  CreateVehicleValues,
  VehicleQueryValues,
  VehiclePhotoValues,
  VehiclePhotoResponse,
  SingleVehiclePhotoResponse,
} from "../schemas/vehicles";

export const vehiclesService = {
  async getVehicles(
    query: VehicleQueryValues = {
      page: 1,
      limit: 10,
      sortBy: "createdAt",
      sortOrder: "desc",
    }
  ): Promise<VehiclesResponse> {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const response = await api.get<VehiclesResponse>(
      `/vehicles?${params.toString()}`
    );
    return response.data;
  },

  async getVehicle(id: string): Promise<VehicleResponse> {
    const response = await api.get<VehicleResponse>(`/vehicles/${id}`);
    return response.data;
  },

  async createVehicle(data: CreateVehicleValues): Promise<VehicleResponse> {
    const response = await api.post<VehicleResponse>("/vehicles", data);
    return response.data;
  },

  async updateVehicle(
    id: string,
    data: Partial<CreateVehicleValues>
  ): Promise<VehicleResponse> {
    const response = await api.patch<VehicleResponse>(`/vehicles/${id}`, data);
    return response.data;
  },

  async deleteVehicle(id: string): Promise<VehicleResponse> {
    const response = await api.delete<VehicleResponse>(`/vehicles/${id}`);
    return response.data;
  },

  async getVehiclePhotos(
    vehicleId: string
  ): Promise<VehiclePhotoResponse> {
    const response = await api.get<VehiclePhotoResponse>(`/vehicles/${vehicleId}/photos`);
    return response.data;
  },

  async addVehiclePhoto(
    vehicleId: string,
    data: VehiclePhotoValues
  ): Promise<SingleVehiclePhotoResponse> {
    const response = await api.post<SingleVehiclePhotoResponse>(`/vehicles/${vehicleId}/photos`, data);
    return response.data;
  },

  async removeVehiclePhoto(
    photoId: string
  ): Promise<SingleVehiclePhotoResponse> {
    const response = await api.delete<SingleVehiclePhotoResponse>(`/vehicles/photos/${photoId}`);
    return response.data;
  },
};
