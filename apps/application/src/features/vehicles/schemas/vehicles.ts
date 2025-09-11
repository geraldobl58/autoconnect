import { z } from "zod";

export const vehicleSchema = z.object({
  brand: z
    .string()
    .min(2, "A marca deve ter no minimo 2 caracteres")
    .max(50, "A marca deve ter no maximo 50 caracteres"),
  model: z
    .string()
    .min(2, "O modelo deve ter no minimo 2 caracteres")
    .max(50, "O modelo deve ter no maximo 50 caracteres"),
  year: z
    .number()
    .int("O ano deve ser um numero inteiro")
    .min(1900, "O ano deve ser maior que 1900")
    .max(
      new Date().getFullYear() + 1,
      "O ano nao pode ser superior ao ano atual + 1"
    ),
  color: z
    .string()
    .max(30, "A cor deve ter no maximo 30 caracteres")
    .optional(),
  mileage: z
    .number()
    .int("A quilometragem deve ser um numero inteiro")
    .min(0, "A quilometragem deve ser maior ou igual a 0")
    .optional(),
  price: z.number().positive("O preco deve ser maior que zero"),
  status: z
    .enum(["AVAILABLE", "RESERVED", "SOLD"])
    .optional()
    .default("AVAILABLE"),
});

export const vehicleQuerySchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().min(1).max(100).default(10),
  status: z.enum(["AVAILABLE", "RESERVED", "SOLD"]).optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  color: z.string().optional(),
  yearFrom: z.number().int().min(1900).optional(),
  yearTo: z.number().int().min(1900).optional(),
  priceFrom: z.number().positive().optional(),
  priceTo: z.number().positive().optional(),
  sortBy: z
    .enum(["brand", "model", "year", "price", "mileage", "createdAt"])
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const vehiclePhotoSchema = z.object({
  url: z.string().url("URL da foto deve ser valida"),
});

export type CreateVehicleValues = z.infer<typeof vehicleSchema>;
export type VehicleQueryValues = z.infer<typeof vehicleQuerySchema>;
export type VehiclePhotoValues = z.infer<typeof vehiclePhotoSchema>;
