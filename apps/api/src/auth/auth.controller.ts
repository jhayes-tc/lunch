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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-account')
  async createAccount(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('reviewerId') reviewerId?: string,
  ) {
    const user = await this.authService.signup(email, password, reviewerId);
    return { message: 'Account created successfully', user };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await this.authService.login(email, password);
    response.cookie('authToken', accessToken, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: true, // Set to true in production (requires HTTPS)
      sameSite: 'strict',
    });
    return { message: 'Login successful' };
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
