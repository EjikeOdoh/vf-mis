import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'user@example.com', description: 'Email address used for login.' })
    @IsEmail()
    email!: string;

    @ApiProperty({ example: 'password123', description: 'Account password.', minLength: 8 })
    @IsString()
    @MinLength(8)
    password!: string;
}