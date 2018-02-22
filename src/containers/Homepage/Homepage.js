import React, { Component } from 'react';
import './Homepage.scss';
import MapSection from './MapSection/';
import CityList from './../../components/Cities/CityList';
import cityApi from './../../utils/CityApi';
import locationApi from './../../utils/LocationApi';

export class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {      
      locations: [],
      fetchingLocations: true,
      cities: [],
      fetchingCities: true,
    }
    this.fetchLocations = this.fetchLocations.bind(this);
    this.fetchCities = this.fetchCities.bind(this);

    this.fetchLocations();
    this.fetchCities();
  }
  fetchLocations() {
    locationApi.getLocations().then((locations) => {
      this.setState({locations: locations, fetchingLocations: false});    
    });    
  }   
  fetchCities() {
    cityApi.getCities().then((result) => {
      if (result.success) {
        this.setState({cities: result.cities});
      }
    });
  }
  render() {
    return (
      <div>
        <MapSection locations={this.state.locations} fetchingLocations={this.state.fetchingLocations} google={this.props.config.googleMapsApiKey} />
        <section className="homepage-categories">
          <div className="container">
            <CityList cities={this.state.cities} locations={this.state.locations} fetchingLocations={this.state.fetchingLocations} />
          </div>
      </section>
      </div>
    )
  }
}

export default Homepage;