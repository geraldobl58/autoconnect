import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  IsEnum,
  MinLength,
  MaxLength,
  IsPositive,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VehicleStatus } from '@prisma/client';

export class CreateVehicleDto {
  @ApiProperty({
    description: 'Vehicle brand',
    example: 'Toyota',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  brand: string;

  @ApiProperty({
    description: 'Vehicle model',
    example: 'Corolla',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  model: string;

  @ApiProperty({
    description: 'Vehicle year',
    example: 2022,
    minimum: 1900,
    maximum: 2030,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1900)
  year: number;

  @ApiPropertyOptional({
    description: 'Vehicle color',
    example: 'Red',
    maxLength: 30,
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  color?: string;

  @ApiPropertyOptional({
    description: 'Vehicle mileage in kilometers',
    example: 50000,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  mileage?: number;

  @ApiProperty({
    description: 'Vehicle price',
    example: 25000.99,
    minimum: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @ApiPropertyOptional({
    description: 'Vehicle status',
    enum: VehicleStatus,
    example: VehicleStatus.AVAILABLE,
  })
  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;
}
