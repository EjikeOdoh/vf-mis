import { IsNumber, IsOptional, IsString } from "class-validator";
import { ProperNoun } from "src/common/decorators/proper.decorator";

export class CreateAscgProfileDto {
    @IsOptional()
    @IsString()
    studentId?: string;

    @IsOptional()
    @IsString()
    schoolId?: string;

    @IsOptional()
    @IsString()
    @ProperNoun()
    fatherLastName?: string;

    @IsOptional()
    @IsString()
    @ProperNoun()
    fatherFirstName?: string;

    @IsOptional()
    @IsString()
    fatherPhone?: string;

    @IsOptional()
    @IsString()
    fatherEducation?: string;

    @IsOptional()
    @IsString()
    @ProperNoun()
    motherLastName?: string;

    @IsOptional()
    @IsString()
    @ProperNoun()
    motherFirstName?: string;

    @IsOptional()
    @IsString()
    motherPhone?: string;

    @IsOptional()
    @IsString()
    motherEducation?: string;

    @IsOptional()
    @IsNumber()
    numberOfBrothers?: number;

    @IsOptional()
    @IsNumber()
    numberOfSisters?: number;

    @IsOptional()
    @IsString()
    positionInFamily?: string;

    @IsOptional()
    @IsString()
    specialization?: string;

    @IsOptional()
    @IsString()
    favouriteSubject?: string;

    @IsOptional()
    @IsString()
    mostDifficultSubject?: string;

    @IsOptional()
    @IsString()
    careerChoice1?: string;

    @IsOptional()
    @IsString()
    careerChoice2?: string;

    @IsOptional()
    @IsNumber()
    year?:number;
}
