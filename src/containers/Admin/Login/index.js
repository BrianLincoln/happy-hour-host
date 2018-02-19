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
      <form  className="space-top-sm space-bottom-sm row" onSubmit={this.handleSubmit}>
        <div className="card col-xs-12 col-sm-6 col-sm-offset-3">
          <div className="card-heading">Log In</div>
          <div className="form-element">
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" ref={(username) => this.username = username} />
          </div>
          <div className="form-element">
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" ref={(password) => this.password = password} />         
          </div>          
          <button type="submit" className="button_sm button_curious">Log In</button> or <a href="/admin/signup" className="color-curious"> Sign Up</a>     
        </div>
      </form>   
    )
  }
}

export default Login;