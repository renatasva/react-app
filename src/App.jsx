import React, { Component } from 'react';
import { Route, Switch, Redirect} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute.jsx";
import auth from './services/authService';
import RegisterForm from "./components/registerForm";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
class App extends Component {
  state = {};

  componentDidMount = () => {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <div className="content">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            //in order to pass additional props to Movies component we need to use 'render' atribute
            <Route
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
