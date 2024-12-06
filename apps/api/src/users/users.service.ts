import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(email: string, passwordHash: string) {
    return this.prisma.user.create({ data: { email, passwordHash } });
  }

  // src/users/users.service.ts
  async linkReviewer(userId: number, reviewerId: number) {
    const reviewer = await this.prisma.reviewer.findUnique({
      where: { id: reviewerId },
    });
    if (!reviewer) {
      throw new Error('Reviewer not found');
    }

    if (reviewer.userId) {
      throw new Error('Reviewer is already linked to a user');
    }

    await this.prisma.reviewer.update({
      where: { id: reviewerId },
      data: { userId },
    });
  }

  async getUnlinkedReviewers() {
    return this.prisma.reviewer.findMany({
      where: { userId: null },
    });
  }
}
