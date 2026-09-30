import { ApiProperty } from '@nestjs/swagger';
import { IsString } from "class-validator";

export class RefreshTokenDto {
    @ApiProperty({ example: 'eyJhbGciOi...token', description: 'Refresh token used to mint a new access token.' })
    @IsString()
    refreshToken!: string;
}