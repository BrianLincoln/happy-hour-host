import React, { Component } from 'react';
import cityApi from './../../utils/CityApi';
import Cities from './Cities/Cities';
import Locations from './Locations/Locations';

export class Admin extends Component {
  constructor(props) {
    super(props);
    this.getCities = this.getCities.bind(this);
    this.handleManageNavViewChange = this.handleManageNavViewChange.bind(this);

    this.state =  {
      cities: this.getCities(),
      managerView: "locations"
    }
  }    
  getCities() {
    cityApi.getCities().then((results) => {
      this.setState({cities: results});
    });
  }  

  handleManageNavViewChange(view) {
    this.setState({managerView: view});
  }
  render() {
    let view = null;

    switch(this.state.managerView) {
      default:
      case "locations":
        view = <Locations cities={this.state.cities} />
        break;
      case "cities":
        view = <Cities cities={this.state.cities} getCities={this.getCities} />
        break;
    }
    return (
      <div className="container">
        <div className="button-group space-top-md space-bottom-md">
          <button onClick={() => this.handleManageNavViewChange("cities")} className="button button_dark">Manage Cities/Neighborhoods</button>
          <button onClick={() => this.handleManageNavViewChange("locations")} className="button button_dark">Manage Locations/Specials</button>
        </div>
        {view}
      </div>
    )
  }
}

export default Admin;