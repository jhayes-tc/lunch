// src/reviews/review.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/createReview.dto';
import { Rating } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto): Promise<Rating> {
    const { reviewerName, restaurantName, ...rest } = createReviewDto;

    // Find reviewer by name
    const reviewer = await this.prisma.reviewer.findFirstOrThrow({
      where: { name: reviewerName },
    });
    const restaurant = await this.prisma.restaurant.findFirstOrThrow({
      where: { name: restaurantName },
    });

    return this.prisma.rating.create({
      data: {
        ...rest,
        restaurant: { connect: { id: restaurant.id } },
        reviewer: { connect: { id: reviewer.id } },
      },
    });
  }

  async findAll(): Promise<Rating[]> {
    return this.prisma.rating.findMany();
  }

  async findOne(id: number): Promise<Rating> {
    return this.prisma.rating.findUnique({
      where: { id },
    });
  }
}
