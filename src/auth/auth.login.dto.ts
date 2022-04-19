import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthLoginDto {

   @MinLength(1)
   @IsEmail()
   email: string

   @IsString()
   password: string

}
