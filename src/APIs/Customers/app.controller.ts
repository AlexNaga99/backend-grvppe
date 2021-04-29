import { Controller, Get, Post, Delete, Patch, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { interfaceCustomer } from './interface';

@Controller('customer')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  async getCustomerById(@Param('id') id: number){
    return await this.appService.getCustomerById(id);
  }

  @Get()
  async getCustomers(){
    return await this.appService.getCustomers();
  }

  @Post()
  async insertCustomer(@Body() body: interfaceCustomer){
    return await this.appService.insertCustomer(body);
  }

  @Delete('/:id')
  async deleteCustomer(@Param('id') id: number){
    return await this.appService.deleteCustomer(id);
  }

  @Patch('/:id')
  async updateCustomer(@Param('id') id: number, @Body() body: interfaceCustomer){
    return await this.appService.updateCustomer(id, body);
  }
  
}
