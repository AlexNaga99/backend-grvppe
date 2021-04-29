import mysql from 'mysql';
import { Logger } from '@nestjs/common';
import { config } from 'dotenv';

config();

export const connect_bd = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    port: parseInt(process.env.PORT),
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
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