import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
// import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { TypegooseModule } from 'nestjs-typegoose'
import { getMongoConfig } from './configs/mongo.config'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
   imports: [
      // UsersModule,
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
