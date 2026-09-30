import { ApiProperty } from '@nestjs/swagger';
import { IsString } from "class-validator";

export class CreateTrackDto {
    @ApiProperty({ description: 'Track name.', example: 'Web Development' })
    @IsString()
    track!: string;
}
