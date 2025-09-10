import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsString()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'johndoe@example.com' })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '1190000-0000' })
  phone?: string;

  @IsString()
  @MinLength(6)
  @MaxLength(8)
  @IsStrongPassword()
  @ApiProperty({ example: 'Admin@123456' })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({ example: Role.SELLER, enum: Role })
  role?: Role; // ADMIN ou SELLER
}
