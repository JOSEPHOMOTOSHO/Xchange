import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { User } from 'src/Interfaces/user.interface';
import { JwtPayload } from 'src/Interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,
    ) { }

    async createAccessToken(userId: mongoose.Types.ObjectId) {
        const accessToken = sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
        return accessToken
    }

    async validateUser(jwtPayload: JwtPayload): Promise<any> {
        const user = await this.userModel.findOne({ _id: jwtPayload.userId, verified: true });
        if (!user) {
            throw new UnauthorizedException('User not found.');
        }
        return user;
    }

    private jwtExtractor(request) {
        let token = null;
        if (request.header('x-token')) {
            token = request.get('x-token');
        } else if (request.headers.authorization) {
            token = request.headers.authorization.replace('Bearer ', '').replace(' ', '');
        } else if (request.body.token) {
            token = request.body.token.replace(' ', '');
        }
        if (request.query.token) {
            token = request.body.token.replace(' ', '');
        }
        if (token) {
            try {
                return token;
            } catch (err) {
                throw new BadRequestException('Bad request.');
            }
        }
    }

    returnJwtExtractor() {
        return this.jwtExtractor;
    }

}
