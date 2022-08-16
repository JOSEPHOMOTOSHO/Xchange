import { Request } from 'express';
import { Controller, Post, Body, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { UserService } from 'src/services/users.service';
import { SignInUserDto } from 'src/dtos/signInUser.dto';



@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post("/signup")
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Post('/login')
    async login(@Req() req: Request, @Body() SignInUserDto: SignInUserDto) {
        return await this.userService.login(req, SignInUserDto);
    }
}