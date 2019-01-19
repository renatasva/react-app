import axios from 'axios';
import logger from "./logService";
//importing toast object, not component like in App.js
import { toast } from 'react-toastify';

//interceptor - thing that stops or catches something (success or error) going from one place to another.
//in axios we can incercept our requests and responses and
//if we have a response with an unexpected error we can handle that error in one place
axios.interceptors.response.use(null, error => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    logger.log("Logging the error", error);
    toast.error("An unexpected error occurred");
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
