import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  Max,
  IsString,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { VehicleStatus } from '@prisma/client';

export class VehicleQueryDto {
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Filter by vehicle status',
    enum: VehicleStatus,
    example: VehicleStatus.AVAILABLE,
  })
  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;

  @ApiPropertyOptional({
    description: 'Search by brand (partial match)',
    example: 'Toyota',
  })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({
    description: 'Search by model (partial match)',
    example: 'Corolla',
  })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional({
    description: 'Filter by minimum year',
    example: 2020,
    minimum: 1900,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  yearFrom?: number;

  @ApiPropertyOptional({
    description: 'Filter by maximum year',
    example: 2024,
    minimum: 1900,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  yearTo?: number;

  @ApiPropertyOptional({
    description: 'Filter by minimum price',
    example: 10000,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  priceFrom?: number;

  @ApiPropertyOptional({
    description: 'Filter by maximum price',
    example: 50000,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  priceTo?: number;

  @ApiPropertyOptional({
    description: 'Filter by color (partial match)',
    example: 'Red',
  })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({
    description: 'Sort field',
    example: 'price',
    enum: ['brand', 'model', 'year', 'price', 'mileage', 'createdAt'],
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order',
    example: 'desc',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';
}
