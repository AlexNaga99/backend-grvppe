import axios from 'axios';

export const request = axios.create({
  baseURL: process.env.API_URL,   
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',    
	  'Access-Control-Allow-Origin': '*'
  },
});