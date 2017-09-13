import React, { Component } from 'react';
import loginApi from '../../../utils/LoginApi';

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {};
  }    
  handleSubmit(event) {
    event.preventDefault();
    loginApi.postSignUp(this.username, this.password, this.secretCode).then((status) => {
      console.log(status);
      if (status === 200) {
        console.log("good");
        //window.location.href = '../admin';
      } else {
        console.log("bad");
        this.setState({failureText: "Pshhh... get out of here"});
      }
    });
    console.log(this.username, this.password, this.secretCode);
  }

  render() {
    console.log("xxxxxx");
    
    if (this.state.failureText) {
      return <h2>{this.state.failureText}</h2>
    } else {
      return (
        <div className="login">
            <form className="space-top-sm space-bottom-sm row" onSubmit={this.handleSubmit}>
              <div className="card col-xs-12 col-sm-6 col-sm-offset-3">
                <div className="card-heading">Sign Up</div>
                
                <div className="form-element">
                  <label htmlFor="username">Username:</label>
                  <input id="username" type="text" ref={(username) => this.username = username} />
                </div>
                <div className="form-element">
                  <label htmlFor="password">Password:</label>
                  <input id="password" type="password" ref={(password) => this.password = password} />         
                </div>
                <div className="form-element">
                  <label htmlFor="secretCode">Secret Code:</label>
                  <input id="secretCode" type="password" ref={(secretCode) => this.secretCode = secretCode} />         
                </div>              
                <input className="button_sm button_scooter" type="submit" value="Login" /> or <a href="/sign-up" className="color-scooter"> sign up</a>
              </div>
            </form>             
        </div>
      )      
    }
  }
}

export default Signup;