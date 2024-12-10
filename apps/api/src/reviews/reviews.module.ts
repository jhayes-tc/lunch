// src/reviews/reviews.module.ts
import { Module } from '@nestjs/common';
import { ReviewService } from './reviews.service';
import { ReviewController } from './reviews.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, PrismaService],
})
export class ReviewsModule {}
