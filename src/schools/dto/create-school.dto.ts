import { ApiProperty } from '@nestjs/swagger';
import { Transform } from "class-transformer";
import { IsEnum, IsString } from "class-validator";
import { Category, Program } from "src/common/enum";

export class CreateSchoolDto {

    @ApiProperty({ description: 'School identifier.', example: 'school-001' })
    @IsString()
    id!: string;

    @ApiProperty({ description: 'School name.', example: 'Green Valley School' })
    @IsString()
    school!: string;

    @ApiProperty({ description: 'School category.', enum: Category, example: Category.SENIOR })
    @IsEnum(Category)
    category!: Category

}
