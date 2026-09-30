import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {

    @ApiProperty({ example: 'Jane Doe', description: 'Full name of the user.' })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({ example: 'jane.doe@example.com', description: 'Email address for the account.' })
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({ example: 'strongPassword1', description: 'Password for the account.', minLength: 8 })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password!: string;
}