import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({
        type: 'string',
        example: "user@email.com"
    })
    @IsEmail()
    email!: string;

    @ApiProperty({
        type:'string',
        example: 'Password'
    })
    @IsString()
    @MinLength(8)
    password!: string;
}