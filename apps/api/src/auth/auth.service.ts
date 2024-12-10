import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto } from './dto/createAccount.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createAccount(dto: CreateAccountDto): Promise<any> {
    const { email, password, reviewerId, reviewerName } = dto;

    // Check if the email is already taken
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already taken');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if linking to an existing reviewer
    let newReviewerId: number | null = null;

    if (reviewerId) {
      // Verify the reviewer exists
      const reviewer = await this.prisma.reviewer.findUnique({
        where: { id: reviewerId },
      });

      if (!reviewer) {
        throw new ConflictException('Invalid reviewer ID');
      }

      newReviewerId = reviewerId;
    } else if (reviewerName) {
      // Create a new reviewer if reviewerName is provided
      const newReviewer = await this.prisma.reviewer.create({
        data: { name: reviewerName },
      });

      newReviewerId = newReviewer.id;
    }

    // Create the user account
    const newUser = await this.prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        reviewerId: newReviewerId,
      },
    });

    return {
      message: 'Account created successfully',
      user: newUser,
    };
  }

  async signup(email: string, password: string, reviewerId?: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await this.usersService.createUser(email, hashedPassword);

    // Link to a reviewer if `reviewerId` is provided
    if (reviewerId) {
      await this.usersService.linkReviewer(user.id, Number(reviewerId));
    }

    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      return user;
    }
    return null;
  }

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = dto;

    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async getUnlinkedReviewers() {
    return this.usersService.getUnlinkedReviewers();
  }
}
