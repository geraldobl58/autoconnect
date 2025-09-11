import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleQueryDto } from './dto/vehicle-query.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateVehicleDto) {
    const response = await this.prisma.vehicle.create({
      data: dto,
    });

    return {
      data: response,
      message: 'Vehicle created successfully',
    };
  }

  async findAll(query: VehicleQueryDto = {}) {
    const {
      page = 1,
      limit = 10,
      status,
      brand,
      model,
      yearFrom,
      yearTo,
      priceFrom,
      priceTo,
      color,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const where: Prisma.VehicleWhereInput = {};

    if (status) where.status = status;
    if (brand) where.brand = { contains: brand, mode: 'insensitive' };
    if (model) where.model = { contains: model, mode: 'insensitive' };
    if (color) where.color = { contains: color, mode: 'insensitive' };

    if (yearFrom || yearTo) {
      where.year = {};
      if (yearFrom) where.year.gte = yearFrom;
      if (yearTo) where.year.lte = yearTo;
    }

    if (priceFrom || priceTo) {
      where.price = {};
      if (priceFrom) where.price.gte = priceFrom;
      if (priceTo) where.price.lte = priceTo;
    }

    const skip = (page - 1) * limit;

    const [vehicles, total] = await Promise.all([
      this.prisma.vehicle.findMany({
        where,
        include: {
          photos: true,
          leads: {
            select: {
              id: true,
              name: true,
              status: true,
            },
          },
          sales: {
            select: {
              id: true,
              amount: true,
              createdAt: true,
              seller: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          testDrive: {
            select: {
              id: true,
              date: true,
              lead: {
                select: {
                  name: true,
                  phone: true,
                },
              },
            },
          },
        },
        orderBy: {
          [sortBy]: sortOrder,
        },
        skip,
        take: limit,
      }),
      this.prisma.vehicle.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: vehicles,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      message: 'Vehicles retrieved successfully',
    };
  }

  async findOne(id: string) {
    const response = await this.prisma.vehicle.findUnique({
      where: {
        id,
      },
      include: {
        photos: true,
        leads: {
          include: {
            seller: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        sales: {
          include: {
            seller: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            lead: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        testDrive: {
          include: {
            lead: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
            seller: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!response) {
      throw new NotFoundException('Vehicle not found');
    }

    return {
      data: response,
      message: 'Vehicle retrieved successfully',
    };
  }

  async update(id: string, dto: UpdateVehicleDto) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    // Remove undefined values from dto
    const updateData = Object.fromEntries(
      Object.entries(dto).filter(([, value]) => value !== undefined),
    );

    const response = await this.prisma.vehicle.update({
      where: { id },
      data: updateData,
    });

    return {
      data: response,
      message: 'Vehicle updated successfully',
    };
  }

  async remove(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    const response = await this.prisma.vehicle.delete({
      where: {
        id,
      },
    });

    return {
      data: response,
      message: 'Vehicle removed successfully',
    };
  }

  async addPhoto(vehicleId: string, url: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    const response = await this.prisma.vehiclePhoto.create({
      data: {
        url,
        vehicleId,
      },
    });

    return {
      data: response,
      message: 'Photo added successfully',
    };
  }

  async removePhoto(photoId: string) {
    const photo = await this.prisma.vehiclePhoto.findUnique({
      where: { id: photoId },
    });

    if (!photo) {
      throw new NotFoundException('Photo not found');
    }

    const response = await this.prisma.vehiclePhoto.delete({
      where: { id: photoId },
    });

    return {
      data: response,
      message: 'Photo removed successfully',
    };
  }

  async getVehiclePhotos(vehicleId: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    const photos = await this.prisma.vehiclePhoto.findMany({
      where: { vehicleId },
      orderBy: { id: 'asc' },
    });

    return {
      data: photos,
      message: 'Photos retrieved successfully',
    };
  }
}
