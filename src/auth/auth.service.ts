import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { compare, genSalt, hash } from 'bcrypt'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from 'src/user/user.model'
import { AuthLoginDto } from './auth.login.dto'
import { AuthRegisterDto } from './auth.register.dto'

@Injectable()
export class AuthService {
   constructor(
      @InjectModel(UserModel)
      private readonly UserModel: ModelType<UserModel>,
      private readonly jwtService: JwtService,
   ) {}

   async login(dto: AuthLoginDto) {
      let errors = {
         email: null,
         password: null,
      }
      const user = await this.UserModel.findOne({
         email: dto.email,
      })
      if (!user) {
         errors.email = 'Пользователь не найден. Зарегистрируйтесь*'
      }
      if (dto.email.length === 0) {
         errors.email = 'Поле не может быть пустым*'
      }
      if(user){
         const isValidPassword = await compare(dto.password, user.password)
         if (!isValidPassword) {
            errors.password = 'Пароль неверный*'
         }
      }
      if (dto.password.length === 0) {
         errors.password = 'Поле не может быть пустым*'
      }
      if (errors.email || errors.password) {
         return errors
      } else {
         const tokens = await this.issueTokenPair(String(user._id))
         return {
            user,
            ...tokens,
         }
      }
   }

   async register(dto: AuthRegisterDto) {
      let errors = {
         email: null,
         name: null,
         password: null,
         passwordConfirm: null,
      }
      if (dto.email.length === 0) {
         errors.email = 'Поле не может быть пустым*'
      }
      const oldUser = await this.UserModel.findOne({
         email: dto.email,
      })
      if (oldUser) {
         errors.email = 'Пользователь с таким адресом уже существует*'
      }
      if (dto.name.length === 0) {
         errors.name = 'Поле не может быть пустым*'
      }
      if (dto.password.length < 6) {
         errors.password = 'Пароль должен состоять минимум из 6 символов*'
      }
      if (dto.password.length === 0) {
         errors.password = 'Поле не может быть пустым*'
      }
      if (dto.passwordConfirm.length < 6) {
         errors.passwordConfirm =
            'Пароль должен состоять минимум из 6 символов*'
      }
      if (dto.passwordConfirm.length === 0) {
         errors.passwordConfirm = 'Поле не может быть пустым*'
      }
      if (dto.password !== dto.passwordConfirm) {
         errors.passwordConfirm = 'Пароли не совпадают*'
      }
      if (
         errors.email ||
         errors.name ||
         errors.password ||
         errors.passwordConfirm
      ) {
         return errors
      } else {
         const salt = await genSalt(10)
         const newUser = new this.UserModel({
            name: dto.name,
            email: dto.email,
            password: await hash(dto.password, salt),
            toDo: dto.toDo,
         })
         const user = await newUser.save()
         const tokens = await this.issueTokenPair(String(user._id))
         return {
            user,
            ...tokens,
         }
      }
   }

   async issueTokenPair(_id: string) {
      const data = { _id }
      const accessToken = await this.jwtService.signAsync(data, {
         expiresIn: '1d',
      })
      return { accessToken }
   }

   returnUserFields(user: UserModel) {
      return {
         _id: user._id,
         name: user.name,
         email: user.email,
         toDo: user.toDo,
      }
   }
}
