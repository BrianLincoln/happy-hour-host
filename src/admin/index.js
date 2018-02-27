import React, { Component } from 'react';
import './AdminHomepage.scss';
import Cities from './Cities';
import loginApi from './../utils/LoginApi';

export class Admin extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      verifiedToken: false
    }
  }

  componentWillMount() {
    loginApi.verifiyToken(localStorage.authToken).then((response) => {      
      if (response.success) {
        this.setState({verifiedToken: true})
      } else {
        window.location = "/token-failed";        
      }
    });
  }

  render() {
    if (!this.state.verifiedToken) {
      return (        
        <div className="spinner"></div>        
      )  
    } else {
      return (
        <div className="admin-homepage">  
          <Cities />
        </div> 
      )
    }
  } 
}

export default Admin;