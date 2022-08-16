import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import exchangeRate from 'src/schemas/exchangerate.schema';
import { ExchangeController } from 'src/controllers/exchangerate.controller';
import { ExchangerateService } from 'src/services/exchangerate.service';
import { ExchangeRateRepository } from 'src/repositories/exchangerate.repository';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: "exchangeRate", schema: exchangeRate },
        ])],
    controllers: [ExchangeController],
    providers: [ExchangerateService, ExchangeRateRepository],
    exports: [ExchangeRateRepository, ExchangerateService]
})
export class ExchangeRateModule { }