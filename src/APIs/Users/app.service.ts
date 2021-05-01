import { Injectable } from '@nestjs/common';
import { interfaceUsers } from './interface';
import { executeQuery  } from '../../Connection/mysql';
import { compareSync, hashSync } from 'bcrypt';
@Injectable()
export class AppService {

  async registerUser(body: interfaceUsers) {
    try {
      
      let exists = await this.existisUser(body);
      let isValid = exists[0].data[0];
      if(!isValid){
        let pass = hashSync(body.password, 10);
        let query = ` INSERT INTO ${process.env.DATABASE}.users 
                        (
                          username,
                          password
                        ) 
                      VALUE 
                        (
                          '${body.name}',
                          '${pass}'
                        )`;

        let mysql = await executeQuery(query);
        return mysql;
      }
      else {
        return [{ erro: 'Usuário já existe.', data: '' }];
      }
    } catch (error) {
      return [{ erro: error, data: '' }];
    }
  }

  async loginUser(body: interfaceUsers) {
    try {
      
      let exists = await this.existisUser(body);
      let isValid = exists[0].data[0];
      if(isValid){
        return [{ erro: '', data: isValid.id }];
      }
      else {
        return [{ erro: 'Usuário não existe.', data: '' }];
      }
    } catch (error) {
      return [{ erro: error.message, data: '' }];
    }
  }

  async existisUser(body: interfaceUsers) {
    try {
      let query = ` SELECT 
                      *
                    FROM ${process.env.DATABASE}.users
                    WHERE username = '${body.name}'`;

      let mysql = await executeQuery(query);
      let return_query = mysql[0].data[0];
      let data = mysql[0].data;
      let verifyPass = false;
      let Id = '';
      if(return_query){
        for (const obj of data) {
          let isEqualsPassword = compareSync(body.password, obj.password);
          if(isEqualsPassword){
            verifyPass = true;
            Id = obj.id;
          }
        }
        if(verifyPass){
          return [{ erro: [], data: [{ authentication: 'OK', id: Id }] }];
        }
        else {
          return [{ erro: 'Credenciais inválido.', data: [] }];
        }
      }
      else {
        return [{ erro: 'Usuário não existe.', data: [] }];
      }
    } catch (error) {
      return [{ erro: error, data: [] }];
    }
  }

}
