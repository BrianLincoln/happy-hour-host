import React from 'react';
import './HeaderNav.scss';

function HeaderNav() {
  if (localStorage.authToken) {
    return (
      <div className="header-nav button-group_right">
        <a className="button_sm button_valencia" href="/signout">
          Log out
        </a>
      </div>
    );
  }

  return (
    <div className="header-nav button-group_right">
      <a className="button_sm button_valencia" href="/login">
        Log in
      </a>
      <a className="button_sm button_white" href="/signup">
        Sign up
      </a>
    </div>
  );
}

export default HeaderNav;
