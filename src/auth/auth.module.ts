import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AccessTokenGuard } from './guards/access-token.guard';
import { GoogleAuthService } from './google-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({}),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenGuard, GoogleAuthService],
})
export class AuthModule { }
