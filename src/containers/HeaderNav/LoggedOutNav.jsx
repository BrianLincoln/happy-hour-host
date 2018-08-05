import React from 'react';

function LoggedOutNav() {
  return (
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
  );
}

export default LoggedOutNav;
