import { Controller, Body, HttpCode, HttpStatus, Post, UseGuards, Get, Res, Query, Req, HostParam } from '@nestjs/common';
import { AuthResult, AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refrest-token.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { JwtPayload } from './types/jwt-payload.type';
import { SafeUser } from 'src/users/users.service';
import { GoogleAuthService } from './google-auth.service';
import type { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

const OAUTH_STATE_COOKIE = 'google_oauth_state';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleService: GoogleAuthService,
    private readonly config: ConfigService

  ) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto): Promise<AuthResult> {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto): Promise<AuthResult> {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() dto: RefreshTokenDto): Promise<AuthResult> {
    return this.authService.refresh(dto)
  }

  @Post('logout')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser() user: JwtPayload): Promise<{ success: true }> {
    return this.authService.logout(user.sub);
  }

  @Get('me')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async getProfile(@CurrentUser() user: JwtPayload): Promise<SafeUser> {
    return this.authService.getProfile(user.sub);
  }


  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto)
  }


  private setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string
  ): void {
    const secure = this.config.get('NODE_ENV') === 'production';

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure,
      maxAge: 15 * 60 * 1000
    });

    res.cookie('refresh', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
  }

}
