import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
    @ApiProperty({ description: 'Student first name.', example: 'Jane' })
    @IsString()
    @ProperNoun()
    firstName!: string;

    @ApiProperty({ description: 'Student last name.', example: 'Doe' })
    @IsString()
    @ProperNoun()
    lastName!: string;

    @ApiProperty({ description: 'Date of birth in ISO format.', example: '2005-04-21' })
    @IsDateString()
    dateOfBirth!: string;

    @ApiPropertyOptional({ description: 'Student email address.', example: 'jane.doe@example.com' })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiPropertyOptional({ description: 'Student phone number.', example: '+2348000000000' })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiPropertyOptional({ description: 'Home address.', example: 'No. 10, Main Street' })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({ description: 'Country of origin.', example: 'Nigeria' })
    @IsString()
    @ProperNoun()
    country!: string;

    @ApiProperty({ description: 'Year the student joined the program.', example: 2023 })
    @IsNumber()
    yearJoined!: number;

    @ApiPropertyOptional({ description: 'Program identifier.', example: 'ASCG' })
    @IsOptional()
    @IsString()
    programId?: string;
}
