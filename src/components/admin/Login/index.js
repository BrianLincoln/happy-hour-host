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
    //loginApi.postLogin(this.username, this.password);
  }

  render() {
    return (
      <div className="login">
        <form action="/login" method="post">
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" name="username" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" name="password" />
          </div>
          <button type="submit" className="btn btn-warning btn-lg">Log In</button>
        </form>           
      </div>
    )
  }
}

export default Login;