import {
   Body,
   Controller,
   HttpCode,
   Post,
   UsePipes,
   ValidationPipe,
} from '@nestjs/common'
import { AuthLoginDto } from './dto/auth.login.dto'
import { AuthRegisterDto } from './dto/auth.register.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
   constructor(private readonly AuthService: AuthService) {}

   @UsePipes(new ValidationPipe())
   @HttpCode(200)
   @Post('login')
   async login(@Body() dto: AuthLoginDto) {
      return this.AuthService.login(dto)
   }

   @UsePipes(new ValidationPipe())
   @HttpCode(200)
   @Post('register')
   async register(@Body() dto: AuthRegisterDto) {
      return this.AuthService.register(dto)
   }
}
