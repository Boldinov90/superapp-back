import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { TypegooseModule } from 'nestjs-typegoose'
import { getMongoConfig } from './configs/mongo.config'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
   imports: [
      // Работает только с VPN
      // MongooseModule.forRoot(
      //    'mongodb+srv://bolding:boldinov123@cluster0.voiku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      // ),
      MongooseModule.forRoot('mongodb://localhost:27017/superapp'),
      ConfigModule.forRoot(),
      TypegooseModule.forRootAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory: getMongoConfig,
      }),
      AuthModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
