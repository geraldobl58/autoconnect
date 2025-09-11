export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  year: number;
  color?: string;
  mileage?: number;
  price: number;
  status: VehicleStatus;
  photos: VehiclePhoto[];
  leads: VehicleLead[];
  sales: VehicleSale[];
  testDrive: VehicleTestDrive[];
  createdAt: string;
  updatedAt: string;
};

export type VehiclePhoto = {
  id: string;
  url: string;
  vehicleId: string;
};

export type VehiclePhotoResponse = {
  data: VehiclePhoto[];
  message: string;
};

export type SingleVehiclePhotoResponse = {
  data: VehiclePhoto;
  message: string;
};

export type VehicleLead = {
  id: string;
  name: string;
  status: string;
};

export type VehicleSale = {
  id: string;
  amount: number;
  createdAt: string;
  seller: {
    id: string;
    name: string;
  };
};

export type VehicleTestDrive = {
  id: string;
  date: string;
  lead: {
    name: string;
    phone: string;
  };
};

export type VehiclesResponse = {
  data: Vehicle[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  message: string;
};

export type VehicleResponse = {
  data: Vehicle;
  message: string;
};

export const VehicleStatus = {
  AVAILABLE: "AVAILABLE",
  RESERVED: "RESERVED",
  SOLD: "SOLD",
} as const;

export type VehicleStatus = (typeof VehicleStatus)[keyof typeof VehicleStatus];
