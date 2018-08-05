import React from 'react';

function UserNav() {
  return (
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
  );
}

export default UserNav;
