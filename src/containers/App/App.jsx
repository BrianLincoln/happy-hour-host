import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './../../sprak-styles/sprak.css';
import './App.scss';
import HeaderNav from './../HeaderNav/HeaderNav';
import Homepage from './../Homepage/Homepage';
import Location from './../Location/Location';
import Neighborhood from './../Neighborhood';
import SignUp from '../SignUp/SignUp';
import Login from './../Login/Login';
import SignOut from '../SignOut/SignOut';
import SuggestLocation from '../SuggestLocation/SuggestLocation';
import ManageSuggestions from '../ManageSuggestions/ManageSuggestions';
import ForgotPassword from './../ForgotPassword/ForgotPassword';
import ResetPassword from './../ResetPassword/ResetPassword';
import TokenFailed from './../TokenFailed';
import Admin from './../../admin/';
import AdminCity from './../../admin/City';
import AdminNeighborhood from './../../admin/Neighborhood';
import AdminLocation from './../../admin/Location';
import config from './../../config';
import logo from './../../img/logo-redover-fulltext.svg';

function App() {
  return (
    <div className="App">
      <header className="site-header">
        <a className="logo" href="/">
          <img className="logo-image" src={logo} alt="logo" />
        </a>
        <HeaderNav />
      </header>

      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={() => <Homepage config={config} />} />
            <Route
              exact
              path="/admin"
              render={() => <Admin config={config} />}
            />
            <Route
              exact
              path="/token-failed"
              render={() => <TokenFailed config={config} />}
            />
            <Route
              exact
              path="/admin/city/:cityId"
              render={meta => (
                <AdminCity config={config} cityId={meta.match.params.cityId} />
              )}
            />
            <Route
              exact
              path="/signup"
              render={() => <SignUp config={config} />}
            />
            <Route
              exact
              path="/login"
              render={() => <Login config={config} />}
            />
            <Route
              exact
              path="/signout"
              render={() => <SignOut config={config} />}
            />
            <Route
              exact
              path="/forgot-password"
              render={() => <ForgotPassword config={config} />}
            />

            <Route
              exact
              path="/reset-password/:token"
              render={meta => (
                <ResetPassword
                  config={config}
                  token={meta.match.params.token}
                />
              )}
            />
            <Route
              exact
              path="/suggest-location"
              render={() => <SuggestLocation config={config} />}
            />
            <Route
              exact
              path="/manage-suggestions"
              render={() => <ManageSuggestions config={config} />}
            />
            <Route
              exact
              path="/admin/city/:cityId/neighborhood/:neighborhoodId"
              render={meta => (
                <AdminNeighborhood
                  config={config}
                  cityId={meta.match.params.cityId}
                  neighborhoodId={meta.match.params.neighborhoodId}
                />
              )}
            />
            <Route
              exact
              path="/admin/city/:cityId/location/:locationId"
              render={meta => (
                <AdminLocation
                  config={config}
                  cityId={meta.match.params.cityId}
                  locationId={meta.match.params.locationId}
                />
              )}
            />

            <Route
              exact
              path="/:cityName/neighborhood/:neighborhoodName/"
              render={meta => (
                <Neighborhood
                  config={config}
                  cityName={meta.match.params.cityName}
                  neighborhoodName={meta.match.params.neighborhoodName}
                  neighborhood={
                    meta.location.state
                      ? meta.location.state.neighborhood
                      : null
                  }
                  locations={
                    meta.location.state ? meta.location.state.locations : null
                  }
                  fetchingLocations={
                    meta.location.state
                      ? meta.location.state.fetchingLocations
                      : null
                  }
                />
              )}
            />
            <Route
              exact
              path="/locations/:locationId/:cityName?/:locationName?"
              render={meta => (
                <Location
                  config={config}
                  location={meta.location.state}
                  locationName={meta.match.params.locationId}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
