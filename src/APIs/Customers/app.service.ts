import { Injectable } from '@nestjs/common';
import { interfaceCustomer } from './interface';
import { connect_bd, executeQuery  } from '../../Connection/mysql';

@Injectable()
export class AppService {
  
  async getCustomerById(id: number) {
    try {

      let query = ` SELECT 
                      id,
                      name,
                      cpf,
                      email
                    FROM ${process.env.DATABASE}.customers WHERE id = '${id}' ORDER BY name ASC`;

      let mysql = await executeQuery(query);
      return mysql;
    } catch (error) {
      return error;
    }
  }

  async getCustomers() {
    try {

      let query = ` SELECT 
                      id,
                      name,
                      cpf,
                      email
                    FROM ${process.env.DATABASE}.customers ORDER BY name ASC`;

      let mysql = await executeQuery(query);
      return mysql;
    } catch (error) {
      return error;
    }
  }

  async insertCustomer(body: interfaceCustomer) {
    try {
      
      let exists = await this.existisCustomer(body.cpf, body.email);
      if(!exists[0].data[0]){
        let query = ` INSERT INTO ${process.env.DATABASE}.customers 
        (
          name,
          cpf,
          email
        ) 
      value 
        (
          '${body.name}',
          ${body.cpf},
          '${body.email}'
        )`;

        let mysql = await executeQuery(query);
        return mysql;
      }
      else {
        return [{ erro: 'Usuário já existente!', data: '' }];
      }
    } catch (error) {
      return error;
    }
  }

  async deleteCustomer(id: number) {
    try {

      let query = `DELETE FROM ${process.env.DATABASE}.customers WHERE id = '${id}'`;

      let mysql = await executeQuery(query);
      return mysql;
    } catch (error) {
      return error;
    }
  }

  async updateCustomer(id: number, body: interfaceCustomer) {
    try {

      let query = ` UPDATE ${process.env.DATABASE}.customers
                    SET 
                      ${body.name ? `name = '${body.name}' ${body.cpf || body.email ? ',' : ''}` : ''}
                      ${body.cpf ? `cpf = ${body.cpf} ${body.email ? ',' : ''}` : ''}
                      ${body.email ? `email = '${body.email}'` : ''}
                    WHERE
                      id = '${id}';`;

      let mysql = await executeQuery(query);
      return mysql;
    } catch (error) {
      return error;
    }
  }

  async existisCustomer(cpf: number, email: string) {
    try {

      let query = ` SELECT 
                      id
                    FROM ${process.env.DATABASE}.customers
                    WHERE cpf = '${cpf}' OR email = '${email}'`;

      let mysql = await executeQuery(query);
      return mysql;
    } catch (error) {
      return error;
    }
  }

}
