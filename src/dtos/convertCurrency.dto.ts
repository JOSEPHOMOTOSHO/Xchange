import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class ConvertCurrencyDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(6)
    readonly baseCurrency: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(6)
    readonly quoteCurrency: string;

    @IsNumber()
    @IsNotEmpty()
    readonly amount: number;
};
