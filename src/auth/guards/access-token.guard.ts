import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import type { Request } from 'express';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthenticatedRequest } from "../types/authenticated-request.type";

@Injectable()
export class AccessTokenGuard implements CanActivate {
    constructor(
        private readonly jwt: JwtService,
        private readonly config: ConfigService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>()
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Missing access token')
        }

        try {
            const payload = await this.jwt.verifyAsync(token, {
                secret: this.config.getOrThrow<string>('ACCESS_TOKEN_SECRET')
            });

            (request as AuthenticatedRequest).user =  payload;
        } catch (error) {
            throw new UnauthorizedException('Invalid access token')
        }

        return true;

    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return undefined;
        }

        const [type, token] = authHeader?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}