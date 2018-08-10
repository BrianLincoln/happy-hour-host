import React, { Component } from 'react';
import AddCity from './AddCity/AddCity';
import CityListItem from './CityListItem/CityListItem';
import cityApi from '../../utils/CityApi';

class Cities extends Component {
  constructor(props) {
    super(props);

    this.fetchCities = this.fetchCities.bind(this);
    this.deleteCity = this.deleteCity.bind(this);
    this.state = {};

    this.fetchCities();
  }

  fetchCities() {
    cityApi.getCities().then((result) => {
      if (result.success) {
        this.setState({
          cities: result.cities,
        });
      }
    });
  }

  deleteCity(cityId) {
    cityApi.deleteCity(cityId).then(() => {
      this.fetchCities();
    });
  }

  render() {
    const { cities } = this.state;

    if (!cities) {
      return <div className="spinner" />;
    }
    const citiesComponent = !cities
      ? null
      : cities.map(city => (
        <CityListItem
          key={city._id}
          deleteCity={this.deleteCity}
          city={city}
        />
      ));

    return (
      <div className="card">
        <div className="card-heading">
          <h1>Cities</h1>
          <AddCity fetchCities={this.fetchCities} />
        </div>
        <ul className="list-group">{citiesComponent}</ul>
      </div>
    );
  }
}

export default Cities;
