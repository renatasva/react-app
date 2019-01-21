import React from 'react';
import logo from '../images/logo.png';
import { NavLink, Link } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light ">
      <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <div className="navbar-nav mr-auto">
          <NavLink className="nav-item nav-link" to="/holidays">
            Holiday packages
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Destinations
          </NavLink>
          <NavLink className="nav-item nav-link" to="/rentals">
            Discover more
          </NavLink>
        </div>
      </div>
      <div className="mx-auto order-0">
        <Link className="navbar-brand mx-auto" id="logo-title" to="/">
          <img src={logo} height="33" width="33"/>
          holideo
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
            <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <div className="navbar-nav ml-auto">
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                <i className="fa fa-sign-in"></i> Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                <i className="fa fa-user"></i> {user.name}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
   );
};

export default NavBar;
