// src/reviewers/dto/create-reviewer.dto.ts
import { IsString } from 'class-validator';

export class CreateReviewerDto {
  @IsString()
  name: string;
}
