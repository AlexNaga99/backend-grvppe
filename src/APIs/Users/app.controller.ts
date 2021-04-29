import { Controller, Get, Post, Delete, Patch, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { interfaceUsers } from './interface';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  async loginUser(@Body() body: interfaceUsers){
    return await this.appService.loginUser(body);
  }

  @Post('/register')
  async registerUser(@Body() body: interfaceUsers){
    return await this.appService.registerUser(body);
  }
  
}
