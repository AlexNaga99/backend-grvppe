import axios from 'axios';

const request = axios.create({
  baseURL: process.env.URL,   
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',    
	  'Access-Control-Allow-Origin': '*'
  },
});
export default request;