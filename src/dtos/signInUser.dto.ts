import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString, IsEnum } from 'class-validator';


export class SignInUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    readonly password: string;
}
