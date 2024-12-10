import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurants.service';
import { RestaurantController } from './restaurants.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService, PrismaService],
})
export class RestaurantsModule {}
