import {
   BadRequestException,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { compare, genSalt, hash } from 'bcrypt'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from 'src/user/user.model'
import { AuthDto } from './auth.dto'

@Injectable()
export class AuthService {
   constructor(
      @InjectModel(UserModel)
      private readonly UserModel: ModelType<UserModel>,
      private readonly jwtService: JwtService,
   ) {}

   async login(dto: AuthDto) {
      const user = await this.validateUser(dto)
      const tokens = await this.issueTokenPair(String(user._id))
      return {
         user: this.returnUserFields(user),
         ...tokens,
      }
   }

   async register(dto: AuthDto) {
      const oldUser = await this.UserModel.findOne({
         name: dto.name,
         email: dto.email
      })
      if (oldUser)
         throw new BadRequestException(
            'Пользователь с таким адресом уже существует',
         )
      const salt = await genSalt(10)
      const newUser = new this.UserModel({
         name: dto.name,
         email: dto.email,
         password: await hash(dto.password, salt)
      })
      const user = await newUser.save()
      const tokens = await this.issueTokenPair(String(user._id))
      return {
         user: this.returnUserFields(user),
         ...tokens,
      }
   }

   async validateUser(dto: AuthDto) {
      const user = await this.UserModel.findOne({
         name: dto.name,
         email: dto.email
      })
      if (!user) throw new UnauthorizedException('Пользователь не найден')

      const isValidPassword = await compare(dto.password, user.password)
      if (!isValidPassword) throw new UnauthorizedException('Пароль неверный')
      return user
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
      }
   }
}
