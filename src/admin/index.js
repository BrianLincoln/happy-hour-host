import React, { Component } from 'react';
import './AdminHomepage.scss';
import Cities from './Cities';

export class Admin extends Component {

  render() {
    return (
        <div className="admin-homepage">  
          <Cities />
        </div> 
    )    
  } 
}

export default Admin;