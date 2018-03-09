import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Homepage.scss';
import MapSection from './../MapSection/';
import City from './../../components/Cities/City';
import cityApi from './../../utils/CityApi';

const propTypes = {
  config: PropTypes.shape({
    googleMapsApiKey: PropTypes.string,
  }).isRequired,
};

export class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityName: '',
      fetchingCity: true,
    };

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
          fetchingCity: false,
        });
      } else {
        this.setState({
          fetchingCity: 'failed',
        });
      }
    });
  }

  render() {
    if (this.state.fetchingCity === 'failed') {
      return (
        <div className="container space-top-xl space-bottom-xl">
          <h2>Hmmm... ran into an issue finding a city. Try refreshing!</h2>
        </div>
      );
    }

    const citySection = this.state.city ? (
      <section className="homepage-categories">
        <div className="container">
          <City
            city={this.state.city}
            locations={this.state.locations}
            fetchingData={this.state.fetchingCity}
          />
        </div>
      </section>
    ) : null;

    return (
      <div>
        <MapSection
          cityName={this.state.cityName}
          locations={this.state.locations}
          fetchingData={this.state.fetchingCity}
          googleMapsApiKey={this.props.config.googleMapsApiKey}
        />
        {citySection}
      </div>
    );
  }
}

Homepage.propTypes = propTypes;

export default Homepage;
