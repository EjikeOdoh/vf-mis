import { IntersectionType } from "@nestjs/mapped-types";
import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateAscgParticipationDto } from "src/ascg-participation/dto/create-ascg-participation.dto";
import { CreateAscgProfileDto } from "src/ascg-profile/dto/create-ascg-profile.dto";
import { CreateCbcParticipationDto } from "src/cbc-participation/dto/create-cbc-participation.dto";
import { CreateCbcProfileDto } from "src/cbc-profile/dto/create-cbc-profile.dto";
import { ProperNoun } from "src/common/decorators/proper.decorator";
import { CreateScParticipationDto } from "src/sc-participation/dto/create-sc-participation.dto";

export class CreateStudentDto extends IntersectionType(
    CreateAscgProfileDto,
    CreateCbcProfileDto,
    CreateAscgParticipationDto,
    CreateScParticipationDto,
    CreateCbcParticipationDto
) {
    @IsString()
    @ProperNoun()
    firstName!: string;

    @IsString()
    @ProperNoun()
    lastName!: string;

    @IsDateString()
    dateOfBirth!: string;

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

    @IsOptional()
    @IsString()
    programId?: string;

    //For cbc data
    @IsOptional()
    @IsString()
    trackId?: string;
}
