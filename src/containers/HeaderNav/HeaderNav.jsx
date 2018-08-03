import React, { Component } from 'react';
import loginApi from './../../utils/LoginApi';
import './HeaderNav.scss';

class HeaderNav extends Component {
  constructor(props) {
    super(props);

    this.fetchUser = this.fetchUser.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);

    this.state = {
      isLoggedIn: false,
      showMenu: false,
    };
  }

  componentWillMount() {
    const hasAuthToken = typeof localStorage.authToken !== 'undefined';

    if (hasAuthToken) {
      this.fetchUser();

      // should chain this with fetchUser
      this.setState({
        isLoggedIn: true,
      });
    }
  }

  fetchUser() {
    loginApi.getUserFromAuthToken().then((result) => {
      if (result.success) {
        this.setState({
          email: result.email,
        });
      }
    });
  }

  toggleMenu() {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  render() {
    if (this.state.isLoggedIn) {
      const menu = this.state.showMenu ? (
        <nav className="header-nav-menu">
          <a href="/suggest-location">
            <i className="header-nav-icon fas fa-map-marker-alt" />
            Suggest a location
          </a>
          <a href="/signout">
            <i className="header-nav-icon fas fa-sign-out-alt" />
            Log out
          </a>
        </nav>
      ) : null;

      return (
        <div className="header-nav">
          <button
            className="header-nav-menu-toggle reset-button"
            onClick={this.toggleMenu}
          >
            <span className="header-nav-menu-toggle-email">
              {this.state.email}
            </span>{' '}
            <i className="fas fa-bars" />
          </button>
          {menu}
        </div>
      );
    }
    const menu = this.state.showMenu ? (
      <nav className="header-nav-menu">
        <div className="header-nav-signup-pitch">
          <h3 className="space-bottom-md">Do your part!</h3>
          <p>
            Sign up to suggest your favorite places and report inaccurate info.
          </p>
        </div>
        <a href="/login">
          <i className="header-nav-icon fas fa-sign-in-alt" />
          Log in
        </a>
        <a href="/signup">
          <i className="header-nav-icon fas fa-user-plus" />
          Sign up
        </a>
      </nav>
    ) : null;

    return (
      <div className="header-nav">
        <button
          className="header-nav-menu-toggle reset-button"
          onClick={this.toggleMenu}
        >
          <span className="header-nav-menu-toggle-email">
            {this.state.email}
          </span>{' '}
          <i className="fas fa-bars" />
        </button>
        {menu}
      </div>
    );
  }
}

export default HeaderNav;
