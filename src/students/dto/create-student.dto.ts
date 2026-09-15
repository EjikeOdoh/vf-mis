import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { ProperNoun } from "src/common/decorators/proper.decorator";

export class CreateStudentDto {
    @IsString()
    @ProperNoun()
    firstName!: string;

    @IsString()
    @ProperNoun()
    lastName!: string;

    @IsDate()
    dateOfBirth!: Date;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsString()
    country!: string;

    @IsNumber()
    yearJoined!: number;

}
