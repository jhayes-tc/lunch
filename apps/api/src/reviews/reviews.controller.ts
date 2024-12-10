import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReviewService } from './reviews.service';
import { CreateReviewDto } from './dto/createReview.dto';
import { Rating } from '@prisma/client';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto): Promise<Rating> {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  findAll(): Promise<Rating[]> {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Rating> {
    return this.reviewService.findOne(Number(id));
  }
}
