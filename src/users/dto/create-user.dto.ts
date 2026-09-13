import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name!: string;

    @IsEmail()
    email!: string;

    @IsString()
    passwordHash?: string;

    @IsString()
    avatarUrl?: string;

    @IsString()
    microsoftId?: string;
}
