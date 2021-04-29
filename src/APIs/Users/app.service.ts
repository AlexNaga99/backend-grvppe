import { Injectable } from '@nestjs/common';
import { interfaceUsers } from './interface';
import { executeQuery  } from '../../Connection/mysql';
import { request } from '../../Connection/http';

@Injectable()
export class AppService {

  async registerUser(body: interfaceUsers) {
    try {
      
      let exists = await this.existisUser(body);
      if(!exists[0].data[0]){
        let query = ` INSERT INTO ${process.env.DATABASE}.users 
        (
          username,
          password
        ) 
      value 
        (
          '${body.name}',
          '${body.password}'
        )`;

        let mysql = await executeQuery(query);
        return mysql;
      }
      else {
        return [{ erro: 'User already exists.', data: '' }];
      }
    } catch (error) {
      return [{ erro: error, data: '' }];
    }
  }

  async loginUser(body: interfaceUsers) {
    try {
      
      let exists = await this.existisUser(body);
      if(exists[0].data[0]){
        let result = await request.get(`${process.env.API_URL}/3/authentication/token/new?api_key=${process.env.API_KEY}`);
        if(result.status === 200){
          return [{ erro: '', data: { token: result.data.request_token } }];
        }
      }
      else {
        return [{ erro: 'User does not exist.', data: '' }];
      }
    } catch (error) {
      return [{ erro: error.message, data: '' }];
    }
  }

  async existisUser(body: interfaceUsers) {
    try {

      let query = ` SELECT 
                      id
                    FROM ${process.env.DATABASE}.users
                    WHERE username = '${body.name}' AND password = '${body.password}'`;
                    
      let mysql = await executeQuery(query);
      return mysql;
    } catch (error) {
      return [{ erro: error, data: '' }];
    }
  }

}
