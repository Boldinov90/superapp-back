import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
   constructor(private readonly userService: UsersService) { }

   @Get()
   getAll(): Promise<User[]> {
      return this.userService.getAll();
   }

   @Get(':id')
   getOne(@Param('id') id: string): Promise<User> {
      return this.userService.getById(id);
   }

   @Post()
   create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.userService.create(createUserDto);
   }

   @Delete(':id')
   remove(@Param('id') id: string): Promise<User> {
      return this.userService.remove(id);
   }

   @Put(':id')
   update(
      @Body() updateUserDto: UpdateUserDto,
      @Param('id') id: string,
   ): Promise<User> {
      return this.userService.update(id, updateUserDto);
   }
}
