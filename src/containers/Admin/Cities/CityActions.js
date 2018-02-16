import React, { Component } from 'react';
import cityApi from './../../../utils/CityApi';
import './CityActions.scss';
import AddNeighborhood from './AddNeighborhood';

export class CityActions extends Component {
  constructor(props) {
    super(props);
    this.deleteCity = this.deleteCity.bind(this);
  }
  deleteCity() {
    if (window.confirm("◔_◔ Super sure you want to delete " + this.props.name + "?")) {
        cityApi.deleteCity(this.props._id).then(() => this.props.getCities());
    }
  }    
  render() {
    return (
        <div className="admin-city-actions">
            <AddNeighborhood {...this.props} />
            <button onClick={this.deleteCity} className="button_sm button_dark">delete city</button>
        </div>
    )
  }
}

export default CityActions;