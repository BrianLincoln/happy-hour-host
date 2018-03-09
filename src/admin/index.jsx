import React, { Component } from 'react';
import './AdminHomepage.scss';
import Cities from './Cities';
import loginApi from './../utils/LoginApi';

export class Admin extends Component {
  constructor() {
    super();

    this.state = {
      verifiedToken: false,
    };
  }

  componentWillMount() {
    loginApi.verifiyToken(localStorage.authToken).then((response) => {
      if (response.success) {
        this.setState({
          verifiedToken: true,
        });
      } else {
        window.location = '/token-failed';
      }
    });
  }

  render() {
    if (!this.state.verifiedToken) {
      return <div className="spinner" />;
    }

    return (
      <div className="admin-homepage">
        <div className="admin-header">
          <a href="/admin/signout">sign out</a>
        </div>
        <Cities />
      </div>
    );
  }
}

export default Admin;
