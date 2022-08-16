import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExchangeRateModule } from './modules/exchangerate.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth.module';
import dbConfig from './config/dbConfig';
import { UsersModule } from './modules/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
    }),
    MongooseModule.forRoot(dbConfig().baseUrl),
    ExchangeRateModule,
    AuthModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
