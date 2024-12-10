import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAccountDto } from './dto/createAccount.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-account')
  async createAccount(@Body() dto: CreateAccountDto) {
    return this.authService.createAccount(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('authToken');
    return { message: 'Sign-out successful' };
  }

  @Get('available-reviewers')
  async getAvailableReviewers() {
    const reviewers = await this.authService.getUnlinkedReviewers();
    return reviewers;
  }
}
