import http from './httpService';

const apiEndpoint = "/users";

export function register(user) {
  //we send http request to the server and return a promise
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  })
}
