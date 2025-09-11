import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { AddPhotoDto } from './dto/add-photo.dto';
import { VehicleQueryDto } from './dto/vehicle-query.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new vehicle',
    description:
      'Creates a new vehicle in the system. Only ADMIN users can create vehicles.',
  })
  @ApiBody({ type: CreateVehicleDto })
  @ApiResponse({
    status: 201,
    description: 'Vehicle created successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            brand: { type: 'string' },
            model: { type: 'string' },
            year: { type: 'number' },
            color: { type: 'string' },
            mileage: { type: 'number' },
            price: { type: 'number' },
            status: { type: 'string', enum: ['AVAILABLE', 'RESERVED', 'SOLD'] },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Only ADMIN users can create vehicles',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data',
  })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all vehicles with pagination and filters',
    description:
      'Retrieves a paginated list of vehicles with optional filtering and sorting.',
  })
  @ApiResponse({
    status: 200,
    description: 'Vehicles retrieved successfully with pagination',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              brand: { type: 'string' },
              model: { type: 'string' },
              year: { type: 'number' },
              color: { type: 'string' },
              mileage: { type: 'number' },
              price: { type: 'number' },
              status: {
                type: 'string',
                enum: ['AVAILABLE', 'RESERVED', 'SOLD'],
              },
              photos: {
                type: 'array',
                items: { type: 'object' },
              },
              leads: {
                type: 'array',
                items: { type: 'object' },
              },
              sales: {
                type: 'array',
                items: { type: 'object' },
              },
              testDrive: {
                type: 'array',
                items: { type: 'object' },
              },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
            total: { type: 'number' },
            totalPages: { type: 'number' },
            hasNextPage: { type: 'boolean' },
            hasPrevPage: { type: 'boolean' },
          },
        },
      },
    },
  })
  findAll(@Query() query: VehicleQueryDto) {
    return this.vehiclesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get vehicle by ID',
    description: 'Retrieves a specific vehicle by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Vehicle ID',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Vehicle retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            brand: { type: 'string' },
            model: { type: 'string' },
            year: { type: 'number' },
            color: { type: 'string' },
            mileage: { type: 'number' },
            price: { type: 'number' },
            status: {
              type: 'string',
              enum: ['AVAILABLE', 'RESERVED', 'SOLD'],
            },
            sales: {
              type: 'array',
              items: { type: 'object' },
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Vehicle not found',
  })
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update vehicle',
    description:
      'Updates a vehicle by ID. Only ADMIN users can update vehicles.',
  })
  @ApiParam({
    name: 'id',
    description: 'Vehicle ID',
    type: 'string',
  })
  @ApiBody({ type: UpdateVehicleDto })
  @ApiResponse({
    status: 200,
    description: 'Vehicle updated successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            brand: { type: 'string' },
            model: { type: 'string' },
            year: { type: 'number' },
            color: { type: 'string' },
            mileage: { type: 'number' },
            price: { type: 'number' },
            status: {
              type: 'string',
              enum: ['AVAILABLE', 'RESERVED', 'SOLD'],
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Only ADMIN users can update vehicles',
  })
  @ApiResponse({
    status: 404,
    description: 'Vehicle not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data',
  })
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete vehicle',
    description:
      'Deletes a vehicle by ID. Only ADMIN users can delete vehicles.',
  })
  @ApiParam({
    name: 'id',
    description: 'Vehicle ID',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Vehicle deleted successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            brand: { type: 'string' },
            model: { type: 'string' },
            year: { type: 'number' },
            color: { type: 'string' },
            mileage: { type: 'number' },
            price: { type: 'number' },
            status: {
              type: 'string',
              enum: ['AVAILABLE', 'RESERVED', 'SOLD'],
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Only ADMIN users can delete vehicles',
  })
  @ApiResponse({
    status: 404,
    description: 'Vehicle not found',
  })
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }

  @Post(':id/photos')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Add photo to vehicle',
    description: 'Adds a photo to a vehicle. Only ADMIN users can add photos.',
  })
  @ApiParam({
    name: 'id',
    description: 'Vehicle ID',
    type: 'string',
  })
  @ApiBody({ type: AddPhotoDto })
  @ApiResponse({
    status: 201,
    description: 'Photo added successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            url: { type: 'string' },
            vehicleId: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Vehicle not found',
  })
  addPhoto(@Param('id') id: string, @Body() addPhotoDto: AddPhotoDto) {
    return this.vehiclesService.addPhoto(id, addPhotoDto.url);
  }

  @Get(':id/photos')
  @ApiOperation({
    summary: 'Get vehicle photos',
    description: 'Retrieves all photos for a specific vehicle.',
  })
  @ApiParam({
    name: 'id',
    description: 'Vehicle ID',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Photos retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              url: { type: 'string' },
              vehicleId: { type: 'string' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Vehicle not found',
  })
  getPhotos(@Param('id') id: string) {
    return this.vehiclesService.getVehiclePhotos(id);
  }

  @Delete('photos/:photoId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Remove vehicle photo',
    description:
      'Removes a photo from a vehicle. Only ADMIN users can remove photos.',
  })
  @ApiParam({
    name: 'photoId',
    description: 'Photo ID',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Photo removed successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            url: { type: 'string' },
            vehicleId: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Photo not found',
  })
  removePhoto(@Param('photoId') photoId: string) {
    return this.vehiclesService.removePhoto(photoId);
  }
}
