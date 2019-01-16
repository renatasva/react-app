import React, { Component } from 'react';

class LoginForm extends Component {
  state = {
    //when building forms, we need to initialize the properties of our state object either to an empty string or some value that you get from the server
    account: { username: '', password: '' }
  };
  // username = React.createRef();

  //the way to focus on username form. but easier way is just set autoFocus in <input>
  // componentDidMount() {
  //   this.username.current.focus();
  // }

  handleSubmit = e => {
    e.preventDefault();

    //call the server
    //const username = document.getElementById('username').value;
    //line above - we should never access DOM elements in react like that, and we should never work with the 'document' object
    //because the whole point of react is to put an abstraction over document object model(DOM)
    //correct way to access DOM elements in react is giving a reference on line 7. Then in input element we set the ref attribute (line...)
    //but dont use ref too much
    // const username = this.username.current.value;
  };

  handleChange = ({ currentTarget: input }) => {
    const account = {...this.state.account};
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() { 
    const { account } = this.state;
    return  (
    <div className="m-5">
    	<h1>Login</h1>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            autoFocus
            value={account.username}
            onChange={this.handleChange} 
            name="username"
            id="username" 
            type="text" 
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            value={account.password}
            onChange={this.handleChange}
            name="password"
            id="password" 
            type="text" 
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div> 
    );
  }
}
 
export default LoginForm;