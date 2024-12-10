import { IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  reviewerName: string;

  @IsString()
  restaurantName: string;

  @IsString()
  source: string;

  @IsNumber()
  value: number;

  @IsDateString()
  date?: string;
}
