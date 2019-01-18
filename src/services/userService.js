import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + "/users";

export function register(user) {
  //we send http request to the server and return a promise
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  }) 
}