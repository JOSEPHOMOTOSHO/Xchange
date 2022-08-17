import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateExchangeRate {
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
    readonly rate: number;
};
