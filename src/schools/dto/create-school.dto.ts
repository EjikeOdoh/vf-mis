import { Transform } from "class-transformer";
import { IsEnum, IsString } from "class-validator";
import { Category, Program } from "src/common/enum";

export class CreateSchoolDto {

    @IsString()
    id!: string;

    @IsString()
    school!: string;

    @IsEnum(Category)
    category!: Category

}
