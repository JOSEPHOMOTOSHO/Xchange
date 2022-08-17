import { CreateExchangeRate } from "../dtos/createExchangeRate.dto";
import { Injectable } from "@nestjs/common";
import { ExchangeRateRepository } from "../repositories/exchangerate.repository";
import { GetExchangeQuery } from "../dtos/getExchangeQuery.dto";
import { ConvertCurrencyDto } from "../dtos/convertCurrency.dto";



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