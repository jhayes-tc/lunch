// src/restaurants/restaurant.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RestaurantService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { Restaurant } from '@prisma/client';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  create(
    @Body() createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  findAll(): Promise<Restaurant[]> {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Restaurant> {
    return this.restaurantService.findOne(Number(id));
  }
}
