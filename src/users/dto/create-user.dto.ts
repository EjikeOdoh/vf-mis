import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ description: 'Full name of the user.', example: 'Jane Doe' })
    @IsString()
    name!: string;

    @ApiProperty({ description: 'Email address of the user.', example: 'jane.doe@example.com' })
    @IsEmail()
    email!: string;

    @ApiPropertyOptional({ description: 'Hashed password value.', example: '$2b$10$...' })
    @IsString()
    passwordHash?: string;

    @ApiPropertyOptional({ description: 'Avatar URL.', example: 'https://example.com/avatar.png' })
    @IsString()
    avatarUrl?: string;

    @ApiPropertyOptional({ description: 'Microsoft account identifier.', example: 'microsoft-user-id' })
    @IsString()
    microsoftId?: string;
}
