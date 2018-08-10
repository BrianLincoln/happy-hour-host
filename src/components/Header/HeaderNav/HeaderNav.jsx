import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoggedOutNav from './LoggedOutNav';
import AdminNav from './AdminNav';
import UserNav from './UserNav';
import './HeaderNav.scss';

const defaultProps = {
  email: undefined,
  role: undefined,
};

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  email: PropTypes.string,
  role: PropTypes.string,
};

class HeaderNav extends Component {
  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);

    this.state = {
      showMenu: false,
    };
  }

  toggleMenu() {
    const { showMenu } = this.state;

    this.setState({
      showMenu: !showMenu,
    });
  }

  render() {
    const { showMenu } = this.state;
    const {
      isLoggedIn, email, role,
    } = this.props;

    let navItems = null;

    if (showMenu) {
      if (!isLoggedIn) {
        navItems = <LoggedOutNav />;
      } else {
        navItems = role === 'admin' ? <AdminNav /> : <UserNav />;
      }
    }

    return (
      <div className="header-nav">
        <button
          type="button"
          className="header-nav-menu-toggle reset-button"
          onClick={this.toggleMenu}
        >
          <span className="header-nav-email">{email || null}</span>{' '}
          <i className="fas fa-bars" />
        </button>
        {navItems}
      </div>
    );
  }
}

HeaderNav.defaultProps = defaultProps;
HeaderNav.propTypes = propTypes;

export default HeaderNav;
