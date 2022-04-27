import { IsArray, IsEmail, IsString } from 'class-validator'

export class AuthRegisterDto {
   @IsString()
   email: string

   @IsString()
   name: string

   @IsString()
   password: string

   @IsString()
   passwordConfirm: string

   @IsArray()
   toDo: string[] = []

   // @IsString()
   // toDo: string[]
}
