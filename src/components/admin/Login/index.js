import React, { Component } from 'react';
import loginApi from '../../../utils/LoginApi';
import config from './../../../config';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state =  {
    }
  }    
  handleSubmit(event) {
    event.preventDefault();
    loginApi.postLogin(this.username, this.password);
  }

  render() {
    return (
      <div className="login">
          <form className="space-top-sm space-bottom-sm row" action={config.apiPath + "/login"} method="post">
            <div className="card col-xs-12 col-sm-6 col-sm-offset-3">
              <div className="card-heading">Login</div>
              <div className="form-element">
                <label htmlFor="username">Username:</label>
                <input id="username" type="text" ref={(username) => this.username = username} />
              </div>
              <div className="form-element">
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" ref={(password) => this.password = password} />         
              </div>
              <input className="button_sm button_scooter" type="submit" value="Login" /> or <a href="/admin/sign-up" className="color-scooter"> sign up</a>
            </div>
          </form>             
      </div>
    )
  }
}

export default Login;