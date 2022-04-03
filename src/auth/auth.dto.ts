import { isEmail, IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
   @MinLength(1, {message: 'Поле не может быть пустым*'})
   @IsEmail()
   email: string

   @IsString()
   name: string

   @MinLength(6, {message: 'Пароль должен состоять минимум из 6 символов*'})
   @IsString()
   password: string
}
