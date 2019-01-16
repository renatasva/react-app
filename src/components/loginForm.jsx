import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './common/input';

class LoginForm extends Component {
  state = {
    //when building forms, we need to initialize the properties of our state object either to an empty string or some value that you get from the server
    account: { username: '', password: '' },
    errors: {}
  };
 
  //schema doesn't have to be in the state as is not going to change
  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;

    const errors = {};
    //we iterate orver details array and map arary into an object
    for (let item of error.details)
    errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    //call the server
        console.log('Submitted');
  };

  validateProperty = ({  name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const {error} = Joi.validate(obj, schema);
    Joi.validate(obj, schema)
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    //when we update the state we need to clone the (errors) property of our state object 
    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input);
    //if errors message is truthy we going to store it in our errors object
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = {...this.state.account};
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() { 
    const { account, errors } = this.state;

    return  (
    <div className="m-5">
    	<h1>Login</h1>
      <form onSubmit={this.handleSubmit}>
        <Input 
          name="username" 
          value={account.username} 
          label="Username" 
          onChange={this.handleChange} 
          error={errors.username}
        />
        <Input 
          name="password" 
          value={account.password} 
          label="Password" 
          onChange={this.handleChange} 
          error={errors.password}
        />
        <button className="btn btn-primary">Login</button>
      </form>
    </div> 
    );
  }
}
 
export default LoginForm;