import React, { Component } from 'react';
import './../../sprak-styles/sprak.css';
import './App.scss';
import Homepage from './../Homepage/Homepage';
import Location from './../Location/Location';
import Neighborhood from './../Neighborhood';
import TokenFailed from './../TokenFailed';
import Admin from './../../admin/';
import AdminCity from './../../admin/City';
import AdminNeighborhood from './../../admin/Neighborhood';
import AdminLocation from './../../admin/Location';
import Login from './../../admin/Login';
import SignUp from './../../admin//SignUp';
import SignOut from './../../admin/SignOut';
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
              <Route exact path="/token-failed" render={ () => <TokenFailed 
                  config={config} 
                />
              }/>              
              <Route exact path="/admin/city/:cityId" render={ (meta) => <AdminCity 
                  config={config} 
                  cityId={meta.match.params.cityId}
                />
              }/>   
              <Route exact path="/admin/city/:cityId/neighborhood/:neighborhoodId" render={ (meta) => <AdminNeighborhood 
                  config={config} 
                  cityId={meta.match.params.cityId}
                  neighborhoodId={meta.match.params.neighborhoodId}
                />
              }/>  
              <Route exact path="/admin/city/:cityId/location/:locationId" render={ (meta) => <AdminLocation 
                  config={config} 
                  cityId={meta.match.params.cityId}
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
              <Route exact path="/:cityName/neighborhood/:neighborhoodName/" render={ (meta)  => <Neighborhood 
                  config={config}
                  cityName= {meta.match.params.cityName}
                  neighborhoodName= {meta.match.params.neighborhoodName}
                  neighborhood= {meta.location.state ? meta.location.state.neighborhood : null}
                  locations= {meta.location.state ? meta.location.state.locations : null}
                  fetchingLocations= {meta.location.state ? meta.location.state.fetchingLocations : null}
                /> 
              }/> 
              <Route exact path="/:cityName/:locationName/" render={ (meta)  => <Location 
                  config={config}
                  location={meta.location.state}
                  locationName={meta.match.params.locationName}
                  cityName={meta.match.params.cityName}
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
