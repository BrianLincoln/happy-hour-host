import React, { Component } from 'react';
import './AdminHomepage.scss';
import Cities from './Cities';

export class Admin extends Component {

  render() {
    return (
        <div className="admin-homepage">  
          <Cities />
          <a href="/admin/manage-cities">
            <h3><i className="fas fa-map-signs"></i> Manage Cities</h3>
          </a>   
          <a href="/admin/manage-locations">
            <h3><i className="fas fa-building"></i> Manage Locations</h3>
          </a>
          <a href="/admin/signout">
            <h3><i className="fas fa-sign-out-alt"></i> Sign Out</h3>
          </a>
        </div> 
    )    
  } 
}

export default Admin;