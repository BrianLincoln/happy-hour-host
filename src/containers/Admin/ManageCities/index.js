import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import City from './City/';
import AddCity from './AddCity/';
import cityApi from './../../../utils/CityApi';

export class ManageCities extends Component {
  constructor(props) {
    super(props);
    this.fetchCities = this.fetchCities.bind(this);

    this.state =  {};
    
    this.fetchCities();
  }    
  fetchCities() {
    cityApi.getCities().then((result) => {
      if (result.success) {
        this.setState({cities: result.cities});
      }
    });
  }  
  render() {
    if (!this.state.cities) {
      return <div className="spinner"></div>
    } else  {
      const cities = !this.state.cities ? null : this.state.cities.map((city) => {
        return (<City key={city._id} city={city} fetchCities={this.fetchCities}/> );
      })
      return (
        <div className="card">
          <a className="button_sm .button_transparent" href="/admin"><i className="fas fa-arrow-left"></i> back</a>
          <div className="card-heading">
            <h1>Cities</h1>
            <AddCity fetchCities={this.fetchCities} />
          </div>
          <ul className="list-group">
            {cities}
          </ul>
        </div>
      )
    }
  }
}

export default ManageCities;