import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
//below, this way we have userService object in registerForm module and all functions that we exported from userService will be methods of userService object
import * as userService from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {}
  };
 
  schema = {
    username: Joi.string().email().required().label('Username'),
    password: Joi.string().min(5).required().label('Password'),
    name: Joi.string().required().label('Name')
  };
  
  doSubmit = async () => {
    //call the server
    try {
      //line below returns a promise
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      window.location = '/';
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  }
  
  render() { 
    return  (
    <div className="m-5">
    	<h1>Register</h1>
      <form onSubmit={this.handleSubmit}>
        {this.renderInput('username', 'Username')}
        {this.renderInput('password', 'Password', 'password')}
        {this.renderInput('name', 'Name')}
        {this.renderButton('Register')}
      </form>
    </div> 
    );
  }
}
 
export default RegisterForm;