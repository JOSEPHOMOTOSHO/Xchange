import { IsNumber, IsString } from "class-validator";

export class CreateExchangeRate {
    @IsString()
    baseCurrency: string;

    @IsString()
    quoteCurrency: string;

    @IsNumber()
    rate: number;
};
