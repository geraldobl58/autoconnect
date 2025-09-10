import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'johndoe@example.com' })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(8)
  @IsStrongPassword()
  @ApiProperty({ example: 'Admin@123456' })
  password: string;
}
