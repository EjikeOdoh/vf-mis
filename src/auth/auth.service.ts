import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { JwtPayload } from './types/jwt-payload.type';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import * as argon2 from 'argon2';
import { SafeUser, UsersService } from 'src/users/users.service';
import { RefreshTokenDto } from './dto/refrest-token.dto';
import { randomBytes, createHash } from 'crypto';
import type { ForgotPasswordDto } from './dto/forgot-password.dto';
import type { ResetPasswordDto } from './dto/reset-password.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthEvents } from './events/auth.events';
import { UserRegisteredEvent } from './events/user-registered.event';
import { UserLoggedInEvent } from './events/user-logged-in.event';

export type AuthResult = {
    user: SafeUser;
    accessToken: string;
    refreshToken: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
        private readonly eventEmitter: EventEmitter2
    ) { }

    private normalizeEmail(email: string): string {
        return email.trim().toLowerCase();
    }

    private generateAccessToken(payload: JwtPayload): Promise<string> {
        return this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
            expiresIn: this.configService.getOrThrow<string>('ACCESS_TOKEN_EXPIRES_IN') as JwtSignOptions['expiresIn']
        })
    }

    private generateRefreshToken(payload: JwtPayload): Promise<string> {
        return this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow<string>('REFRESH_TOKEN_SECRET'),
            expiresIn: this.configService.getOrThrow<string>('REFRESH_TOKEN_EXPIRES_IN') as JwtSignOptions['expiresIn']
        })
    }

    private async issueTokens(payload: JwtPayload): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        const [accessToken, refreshToken] = await Promise.all([
            this.generateAccessToken(payload),
            this.generateRefreshToken(payload)
        ]);

        return { accessToken, refreshToken };
    }

    async register(dto: RegisterDto): Promise<AuthResult> {
        const email = this.normalizeEmail(dto.email);

        //Check if email already exists
        const existingUser = await this.usersService.findByEmail(email);

        if (existingUser) {
            throw new ConflictException('Account with this email already exists');
        }

        const passwordHash = await argon2.hash(dto.password);

        //Create new user with user service
        const user = await this.usersService.createUser({ ...dto, passwordHash })

        const payload: JwtPayload = { sub: user.id, email: user.email };
        const { accessToken, refreshToken } = await this.issueTokens(payload);

        //Hash refresh token
        const refreshTokenHash = await argon2.hash(refreshToken);

        //Save this hash to database
        await this.usersService.updateRefreshTokenHash(user.id, refreshTokenHash);

        this.eventEmitter.emit(AuthEvents.USER_REGISTERED, new UserRegisteredEvent(
            user.id,
            user.email,
            user.name
        ))

        return {
            user: this.usersService.toSafeUser(user),
            accessToken,
            refreshToken
        };

    }

    async login(dto: LoginDto): Promise<AuthResult> {

        const email = this.normalizeEmail(dto.email);

        //Search for user with matching email
        const user = await this.usersService.findByEmail(email)
        //If none
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordValid = argon2.verify(user.passwordHash, dto.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload: JwtPayload = { sub: user.id, email: user.email };

        const { accessToken, refreshToken } = await this.issueTokens(payload);

        //Hash refresh token
        const refreshTokenHash = await argon2.hash(refreshToken);

        //Update hash in database
        await this.usersService.updateRefreshTokenHash(user.id, refreshTokenHash)

        this.eventEmitter.emit(AuthEvents.USER_LOGGED_IN, new UserLoggedInEvent(
            user.id,
            user.email,
            new Date()
        ))

        return {
            user: this.usersService.toSafeUser(user),
            accessToken,
            refreshToken
        }

    }

    async refresh(dto: RefreshTokenDto): Promise<AuthResult> {
        let payload: JwtPayload;

        try {
            payload = await this.jwtService.verifyAsync<JwtPayload>(dto.refreshToken, {
                secret: this.configService.getOrThrow<string>('REFRESH_TOKEN_SECRET')
            })
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }

        const user = await this.usersService.findById(payload.sub);

        if (!user || !user.refreshTokenHash) {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }

        console.log(user)

        const isRefreshTokenValid = await argon2.verify(
            user.refreshTokenHash,
            dto.refreshToken
        );

        if (!isRefreshTokenValid) {
            throw new UnauthorizedException('Invalid or expired refresh token')
        }

        const newPayload: JwtPayload = { sub: user.id, email: user.email };
        const { accessToken, refreshToken } = await this.issueTokens(newPayload);

        const refreshTokenHash = await argon2.hash(refreshToken)

        await this.usersService.updateRefreshTokenHash(user.id, refreshTokenHash)

        return {
            user: this.usersService.toSafeUser(user),
            accessToken,
            refreshToken
        }

    }

    async logout(userId: string): Promise<{ success: true }> {
        await this.usersService.clearRefreshTokenHash(userId)
        return { success: true }
    }

    async getProfile(userId: string): Promise<SafeUser> {
        const user = await this.usersService.findById(userId)
        if (!user) {
            throw new UnauthorizedException('User no longer exists')
        }

        return this.usersService.toSafeUser(user)
    }


    private hashResetToken(rawToken: string): string {
        return createHash('sha256').update(rawToken).digest('hex');
    }

    async forgotPassword(dto: ForgotPasswordDto) {
        const email = this.normalizeEmail(dto.email);
        const user = await this.usersService.findByEmail(email);

        if (user) {
            const rawToken = randomBytes(32).toString('hex');
            const tokenHash = this.hashResetToken(rawToken);
            const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

            await this.usersService.setPasswordResetToken(
                user.id,
                tokenHash,
                expiresAt
            );

            const resetBaseurl = this.configService.getOrThrow<string>('PASSWORD_RESET_URL');
            const resetUrl = `${resetBaseurl}?token=${tokenHash}`;

            // await this.mailService.sendPasswordResetEmail(user.email, resetUrl);
        }

        return { success: true };
    }

    async resetPassword(dto: ResetPasswordDto) {

        const user = await this.usersService.findByPasswordResetTokenHash(dto.token);

        if (
            !user ||
            !user.passwordResetTokenExpiresAt ||
            user.passwordResetTokenExpiresAt.getTime() < Date.now()
        ) {
            throw new UnauthorizedException('Invalid or expired reset token');
        }

        const passwordHash = await argon2.hash(dto.newPassword);
        await this.usersService.resetPassword(user.id, passwordHash);

        return { success: true }
    }
}
