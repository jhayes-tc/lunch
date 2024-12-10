import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { Restaurant } from '@prisma/client';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    return this.prisma.restaurant.create({
      data: createRestaurantDto,
    });
  }

  async findAll(): Promise<Restaurant[]> {
    return this.prisma.restaurant.findMany();
  }

  async findOne(id: number): Promise<Restaurant> {
    return this.prisma.restaurant.findUnique({
      where: { id },
    });
  }
}
