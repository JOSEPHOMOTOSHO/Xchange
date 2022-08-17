import { Request } from 'express';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../Interfaces/user.interface';
import { CreateUserDto } from '../dtos/createUser.dto';
import { SignInUserDto } from '../dtos/signInUser.dto';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly authService: AuthService
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new this.userModel(createUserDto);
        await this.isEmailUnique(user.email);
        return await user.save();
    }


    async login(req: Request, loginUserDto: SignInUserDto) {
        const user = await this.findUserByEmail(loginUserDto.email);
        await this.checkPassword(loginUserDto.password, user);
        return {
            fullName: `${user.firstName} ${user.lastName}`,
            email: user.email,
            token: await this.authService.createAccessToken(user._id),
        };
    }

    private async isEmailUnique(email: string) {
        const user = await this.userModel.findOne({ email });
        if (user) {
            throw new BadRequestException('Email most be unique.');
        }
    }

    private async findUserByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new NotFoundException('Wrong email or password.');
        }
        return user;
    }

    private async checkPassword(attemptPass: string, user) {
        const match = await bcrypt.compare(attemptPass, user.password);
        if (!match) {
            throw new NotFoundException('Wrong email or password.');
        }
        return match;
    }

}