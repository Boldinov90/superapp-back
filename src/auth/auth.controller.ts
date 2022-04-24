import {
   Body,
   Controller,
   Get,
   HttpCode,
   Param,
   Post,
   Put,
   UsePipes,
   ValidationPipe,
} from '@nestjs/common'
import { AuthLoginDto } from './dto/auth.login.dto'
import { AuthRegisterDto } from './dto/auth.register.dto'
import { AuthService } from './auth.service'
import { UserModel } from 'src/user/user.model'
import { UpdateToDoUserDto } from './dto/auth.update-user-todo.dto'

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

   @UsePipes(new ValidationPipe())
   @HttpCode(200)
   @Get(':id')
   getOne(@Param('id') id: string) {
      return this.AuthService.getUserById(id)
   }

   @UsePipes(new ValidationPipe())
   @HttpCode(200)
   @Put(':id')
   update(
      @Body() updateUserDto: UpdateToDoUserDto,
      @Param('id') id: string,
   ) {
      return this.AuthService.updateUserToDo(id, updateUserDto);
   }
}
