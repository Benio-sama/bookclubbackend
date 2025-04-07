import { IsDate, IsDateString, IsEnum, IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateMemberDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsIn(["M", "F", null, undefined])
    gender?: string;

    @IsNotEmpty()
    @IsDateString()
    birth_date: Date;
}
