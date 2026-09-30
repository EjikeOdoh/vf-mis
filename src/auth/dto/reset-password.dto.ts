import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from "class-validator";

export class ResetPasswordDto {
    @ApiProperty({ example: 'reset-token', description: 'Password reset token from the email link.' })
    @IsString()
    token!: string;

    @ApiProperty({ example: 'newPassword123', description: 'New password to set for the account.', minLength: 8 })
    @IsString()
    @MinLength(8)
    newPassword!: string;
}