import { Injectable } from '@nestjs/common';
import { interfaceCustomer } from './interface';
import { connect_bd, executeQuery  } from '../../Connection/mysql';

@Injectable()
export class AppService {
  async getCustomers(id: number) {
    try {
      let query = id ? `SELECT * FROM ${process.env.DATABASE}.customers WHERE id = '${id}' ` : `SELECT * FROM ${process.env.DATABASE}.customers `;
      let mysql = await executeQuery(query);
      return mysql;
    } catch (error) {
      return error;
    }
  }

  insertCustomer(body: interfaceCustomer) {
    return 'Hello World!';
  }

  deleteCustomer(id: number) {
    return 'Hello World!';
  }

  updateCustomer(id: number, body: interfaceCustomer) {
    return 'Hello World!';
  }

}
