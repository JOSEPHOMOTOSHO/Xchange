import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString, IsEnum, IsArray } from 'class-validator';
import { Role } from 'src/enums/roles.enum';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    readonly lastName: string;

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


    @IsNotEmpty()
    @IsArray()
    @IsEnum(Role, { each: true })
    readonly role: Role[];
}
