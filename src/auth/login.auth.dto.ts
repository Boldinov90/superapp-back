import { IsEmail, IsString, MinLength } from 'class-validator'

export class LoginAuthDto {
   @IsEmail()
   email: string

   @MinLength(6, {message: 'Пароль должен состоять минимум из 6 символов'})
   @IsString()
   password: string
}
