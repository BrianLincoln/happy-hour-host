import React, { Component } from 'react';
import loginApi from '../../utils/LoginApi';

export class SignOut extends Component {
  componentWillMount() {
    loginApi.signOut();
  }

  render() {
    return (
      <div className="hero-text">
        <h1>Signing out...</h1>
      </div>
    );
  }
}

export default SignOut;
