import React, { Component } from 'react';
import loginApi from '../../utils/LoginApi';

export class SignOut extends Component {
  componentWillMount() {
    loginApi.signOut();
  }

  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-sm-offset-3 ">
        <h1>Signing out...</h1>
      </div>
    );
  }
}

export default SignOut;
