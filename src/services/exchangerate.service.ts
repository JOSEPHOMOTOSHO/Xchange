import { CreateExchangeRate } from "src/dtos/createExchangeRate.dto";
import { Injectable } from "@nestjs/common";
import { ExchangeRateRepository } from "src/repositories/exchangerate.repository";
import { GetExchangeQuery } from "src/dtos/getExchangeQuery.dto";
import { ConvertCurrencyDto } from "../dtos/ConvertCurrency.dto";



@Injectable()
export class ExchangerateService {
    constructor(private readonly exchangeRateRepo: ExchangeRateRepository) { }

    async createExchangeRate(exchangeRate: CreateExchangeRate): Promise<any> {
        return await this.exchangeRateRepo.createExchange(exchangeRate)
    }

    async getExchangeRate(exchangeRateQuery: GetExchangeQuery): Promise<any> {
        return this.exchangeRateRepo.getExchangeRate(exchangeRateQuery)
    }

    async convertCurrency(convertCurrencyPayload: ConvertCurrencyDto): Promise<any> {
        return this.exchangeRateRepo.convertCurrency(convertCurrencyPayload)
    }
}