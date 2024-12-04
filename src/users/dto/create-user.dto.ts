import { IsEmail, IsEnum, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { UserRole } from "src/enum/role.enum";

export class CreateUserDto {
    @IsString()
    username:string

    @IsString()
    @IsEmail()
    email:string

    @IsString()
    @IsPhoneNumber()
    phoneNumber:string

    @IsString()
    password:string

    @IsString()
    confirmPassword:string
    
    @IsOptional() 
    @IsEnum(UserRole)
    role?: UserRole;

    @IsOptional()
    @IsNumber()
    rulesId:number
}
