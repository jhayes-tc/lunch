// src/reviewers/reviewers.module.ts
import { Module } from '@nestjs/common';
import { ReviewerService } from './reviewers.service';
import { ReviewerController } from './reviewers.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ReviewerController],
  providers: [ReviewerService, PrismaService],
})
export class ReviewersModule {}
