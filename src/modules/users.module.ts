import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import userSchema from 'src/schemas/user.schema';
import { AuthModule } from './auth.module';
import { UserService } from 'src/services/users.service';
import { UserController } from 'src/controllers/user.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
        AuthModule,
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UsersModule { }
