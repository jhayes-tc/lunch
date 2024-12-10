import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileController } from './profile/profile.controller';
import { ReviewersModule } from './reviewers/reviewers.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ReviewersModule,
    RestaurantsModule,
  ],
  controllers: [AppController, ProfileController],
  providers: [AppService],
})
export class AppModule {}
