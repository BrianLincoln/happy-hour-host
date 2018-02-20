import React, { Component } from 'react';
import './../../sprak-styles/sprak.css';
import './App.scss';
import Homepage from './../Homepage/Homepage';
import Location from './../Location/Location';
import Neighborhood from './../Neighborhood/Neighborhood';
import Admin from './../Admin/Admin';
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
              <Route exact path="/location/:locationId/" render={ (meta)  => <Location 
                  config={config}
                  locationId={meta.match.params.locationId}
                /> 
              }/> 
              <Route exact path="/:city/:neighborhood/" render={ (meta)  => <Neighborhood 
                  config={config}
                  neighborhood= {meta.location.state.neighborhood}
                  locations= {meta.location.state.locations}
                  fetchingLocations= {meta.location.state.fetchingLocations}
                /> 
              }/>           
              <Route exact path="/admin" render={ () => <Admin 
                  config={config} 
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
            </Switch>
          </div>
        </Router>




      </div>
    );
  }
}

export default App;
