import React from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';

class LoginForm extends Form {
  state = {
    //when building forms, we need to initialize the properties of our state object either to an empty string or some value that you get from the server
    data: { username: '', password: '' },
    errors: {}
  };

  //schema doesn't have to be in the state as is not going to change
  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  };

  //determine what should happen when the form is submited
  doSubmit = async () => {
    //call the server
    try {
      const { data } = this.state;
      //we getting the 'json web token' in the body of a response
      await auth.login(data.username, data.password);
      //line below will cause full reload of application
      // window.location = '/';
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return  (
    <div className="m-5">
    	<h1>Login</h1>
      <form onSubmit={this.handleSubmit}>
        {/* as we are inheriting from Form we can just call the method like that below.. */}
        {this.renderInput('username', 'Username')}
        {this.renderInput('password', 'Password', 'password')}
        {this.renderButton('Login')}
      </form>
    </div>
    );
  }
}

export default LoginForm;
