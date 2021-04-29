import mysql from 'mysql';
import { Logger } from '@nestjs/common';

export const connect_bd = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root2',
    port: 3306,
    password: 'a253926373',
    database: 'db_grvppe',
    insecureAuth: true,
});

connect_bd.connect(function(err) {
    if (err) throw err;
    Logger.log('Bando de dados conectado com sucesso');
});

export const executeQuery = async (query) => {
    return new Promise((resolve, reject) => {
        connect_bd.query(query, (error, results, fields) => {
            if(error){
                let response = [{ erro: error, data: '' }];
                reject(response);
            } 
            else {
                let response = [{ erro: '', data: results }];
                resolve(response);
            }
        });
    });
}