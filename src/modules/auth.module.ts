import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/services/auth.service';
import userSchema from 'src/schemas/user.schema';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: userSchema },
        ]),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secretOrPrivateKey: configService.get(process.env.JWT_SECRET),
                signOptions: {
                    expiresIn: process.env.JWT_EXPIRATION,
                },
            }),
            inject: [ConfigService],
        })
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule { }