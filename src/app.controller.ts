import { Controller, Get } from '@nestjs/common'
// import axios from 'axios'
import { AppService } from './app.service'

@Controller()
export class AppController {
   constructor(private readonly appService: AppService) {}

   @Get()
   async getHello() {
      // const {data} = await axios.get('https://superapp-boldinov-default-rtdb.firebaseio.com/Arr/users.json')
      // return data
   }
}
