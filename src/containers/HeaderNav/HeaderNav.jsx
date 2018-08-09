import React, { Component } from 'react';
import loginApi from './../../utils/LoginApi';
import LoggedOutNav from './../HeaderNav/LoggedOutNav';
import AdminNav from './../HeaderNav/AdminNav';
import UserNav from './../HeaderNav/UserNav';
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
          role: result.role,
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
    let navItems = null;

    if (this.state.showMenu) {
      if (!this.state.isLoggedIn) {
        navItems = <LoggedOutNav />;
      } else {
        navItems = this.state.role === 'admin' ? <AdminNav /> : <UserNav />;
      }
    }

    return (
      <div className="header-nav">
        <button
          className="header-nav-menu-toggle reset-button"
          onClick={this.toggleMenu}
        >
          <span className="header-nav-email">{this.state.email}</span>{' '}
          <i className="fas fa-bars" />
        </button>
        {navItems}
      </div>
    );
  }
}

export default HeaderNav;
