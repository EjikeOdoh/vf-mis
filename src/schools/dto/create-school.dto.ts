import { IsEnum, IsString } from "class-validator";
import { Category } from "src/common/enum";

export class CreateSchoolDto {
    @IsString()
    school!: string;

    @IsEnum(Category)
    category!: Category
}
