import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReviewerService } from './reviewers.service';
import { CreateReviewerDto } from './dto/createReviewer.dto';
import { Reviewer } from '@prisma/client';

@Controller('reviewers')
export class ReviewerController {
  constructor(private readonly reviewerService: ReviewerService) {}

  @Post()
  create(@Body() createReviewerDto: CreateReviewerDto): Promise<Reviewer> {
    return this.reviewerService.create(createReviewerDto);
  }

  @Get()
  findAll(): Promise<Reviewer[]> {
    return this.reviewerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Reviewer> {
    return this.reviewerService.findOne(Number(id));
  }
}
