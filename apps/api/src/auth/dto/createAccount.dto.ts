// src/auth/dto/create-account.dto.ts
import { IsOptional, IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsNumber()
  reviewerId?: number;

  @IsOptional()
  @IsString()
  reviewerName?: string; // For creating a new reviewer
}
