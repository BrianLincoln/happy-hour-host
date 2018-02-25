import React, { Component } from 'react';
import AddCity from './AddCity/';
import CityListItem from './CityListItem/';
import cityApi from './../../utils/CityApi';

export class Cities extends Component {
  constructor(props) {
    super(props);

    this.fetchCities = this.fetchCities.bind(this);
    this.deleteCity = this.deleteCity.bind(this);
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
  
  deleteCity(cityId) {
    cityApi.deleteCity(cityId).then(() => {
      this.fetchCities()
    });
  }    

  render() {
    if (!this.state.cities) {
      return <div className="spinner"></div>
    } else  {
      const cities = !this.state.cities ? null : this.state.cities.map((city) => {
        return (<CityListItem key={city._id} deleteCity={this.deleteCity} city={city} />);
      })
      return (
        <div className="card">
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

export default Cities;