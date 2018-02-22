import React, { Component } from 'react';
import './../../sprak-styles/sprak.css';
import './App.scss';
import Homepage from './../Homepage/Homepage';
import Location from './../Location/Location';
import Neighborhood from './../Neighborhood/';
import Admin from './../Admin/';
import ManageCities from './../Admin/ManageCities/index.js';
import ManageLocations from './../Admin/ManageLocations/';
import AdminLocation from './../Admin/ManageLocations/Location/index.js';
import AdminNeighborhood from './../Admin/ManageCities/Neighborhood/';
import Login from './../Admin/Login';
import SignUp from './../Admin//SignUp';
import SignOut from './../Admin/SignOut';
import config from './../../config';
import logo from './../../img/logo-redover-fulltext.svg';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="site-header">
          <a className="logo" href="/">
            <img className="logo-image" src={logo} alt="logo" />     
          </a>
        </header>         

        <Router>
          <div>
            <Switch>
              <Route exact path="/" render={ ()  => <Homepage 
                  config={config}
                /> 
              }/>          
              <Route exact path="/admin" render={ () => <Admin 
                  config={config} 
                />
              }/>            
              <Route exact path="/admin/manage-cities" render={ () => <ManageCities 
                  config={config} 
                />          
              }/>
              <Route exact path="/admin/manage-locations" render={ () => <ManageLocations 
                  config={config} 
                />
              }/>  
              <Route exact path="/admin/city/:cityId/neighborhood/:neighborhoodId" render={ (meta) => <AdminNeighborhood 
                  config={config} 
                  cityId={meta.match.params.cityId}
                  neighborhoodId={meta.match.params.neighborhoodId}
                />
              }/>  
              <Route exact path="/admin/location/:locationId" render={ (meta) => <AdminLocation 
                  config={config} 
                  locationId={meta.match.params.locationId}
                />
              }/>              
              <Route exact path="/admin/login" render={ ()  => <Login 
                  config={config}                 
                />                 
              }/> 
              <Route exact path="/admin/signup" render={ ()  => <SignUp 
                  config={config}                 
                />                 
              }/> 
              <Route exact path="/admin/signout" render={ ()  => <SignOut 
                  config={config}                 
                />                 
              }/>   
              <Route exact path="/location/:locationId/" render={ (meta)  => <Location 
                  config={config}
                  location={meta.location.state}
                  locationId={meta.match.params.locationId}
                /> 
              }/> 
              <Route exact path="/:city/:neighborhood/" render={ (meta)  => <Neighborhood 
                  config={config}
                  cityName= {meta.location.state.cityName}
                  neighborhood= {meta.location.state.neighborhood}
                  locations= {meta.location.state.locations}
                  fetchingLocations= {meta.location.state.fetchingLocations}
                /> 
              }/>                          
            </Switch>
          </div>
        </Router>




      </div>
    );
  }
}

export default App;
