import React, { Component } from 'react';
import './../../sprak-styles/sprak.css';
import './App.scss';
import Homepage from './../homepage';
import City from './../city';
import Admin from './../admin';
import Login from './../admin/Login';
import SignUp from './../admin/SignUp';
import SignOut from './../admin/SignOut';
import config from './../../config';
import logo from './../../img/logo-redover-fulltext.svg';
import ReactGA from 'react-ga';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

ReactGA.initialize('UA-000000-01');

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

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
                  onUpdate={logPageView}
                /> 
              }/>
              <Route exact path="/c/:city/:area?" render={ (meta)  => <City 
                  config={config}
                  city={meta.match.params.city}
                  area={meta.match.params.area}
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
