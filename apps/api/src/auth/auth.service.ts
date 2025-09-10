import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';

import * as bcrypt from 'bcrypt';

import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (exists) throw new ConflictException('Email already in use');

    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        role: dto.role ?? Role.SELLER,
        password: hash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException();

    const response = await bcrypt.compare(password, user.password);

    if (!response) throw new UnauthorizedException();

    const payload = {
      sub: user.id,
      role: user.role,
      email: user.email,
    };

    const access_token = await this.jwt.signAsync(payload);

    return { access_token };
  }
}
