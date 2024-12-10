import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewerDto } from './dto/createReviewer.dto';
import { Reviewer } from '@prisma/client';

@Injectable()
export class ReviewerService {
  constructor(private prisma: PrismaService) {}

  async create(createReviewerDto: CreateReviewerDto): Promise<Reviewer> {
    return this.prisma.reviewer.create({
      data: createReviewerDto,
    });
  }

  async findAll(): Promise<Reviewer[]> {
    return this.prisma.reviewer.findMany();
  }

  async findOne(id: number): Promise<Reviewer> {
    return this.prisma.reviewer.findUnique({
      where: { id },
    });
  }
}
