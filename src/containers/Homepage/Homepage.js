import React, { Component } from 'react';
import './Homepage.scss';
import MapSection from './MapSection/';
import City from './../../components/Cities/City';
import cityApi from './../../utils/CityApi';

export class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityName: "",
      fetchingCity: true
    }
    
    this.fetchCity = this.fetchCity.bind(this);

    this.fetchCity();
  } 
  fetchCity() {
    cityApi.getCity().then((result) => {
      if (result.success) {
        this.setState({
          cityName: result.city.name,
          city: result.city,
          locations: result.city.locations,
          fetchingCity: false
        });
      }
    });
  }
  render() {
    return (
      <div>
        <MapSection cityName={this.state.cityName} locations={this.state.locations} fetchingData={this.state.fetchingCity} google={this.props.config.googleMapsApiKey} />
        <section className="homepage-categories">
          <div className="container">
            <City city={this.state.city} locations={this.state.locations} fetchingData={this.state.fetchingCity} />
          </div>
        </section>
      </div>
    )
  }
}

export default Homepage;