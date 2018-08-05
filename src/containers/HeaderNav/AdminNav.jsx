import React from 'react';

function AdminNav() {
  return (
    <nav className="header-nav-menu">
      <a href="/manage-suggestions">
        <i className="header-nav-icon fas fa-edit" />
        Manage Suggestions
      </a>
      <a href="/signout">
        <i className="header-nav-icon fas fa-sign-out-alt" />
        Log out
      </a>
    </nav>
  );
}

export default AdminNav;
