import React from 'react';
import './Footer.scss';

const Footer = () => (
  <footer className="site-footer container">
    <h2 className="space-bottom-md">
      {' '}
      {" Don't see your favorite happy hour specials? "}
    </h2>
    <p>Sign up to suggest missing happy hours and report innaccurate info.</p>
    <div className="button-group">
      <a className="button_sm button_curious" href="/login">
        <i className="fas fa-sign-in-alt" />
        Log in
      </a>
      <a className="button_sm button_curious" href="/signup">
        <i className="fas fa-user-plus" />
        Sign up
      </a>
    </div>
  </footer>
);

export default Footer;
