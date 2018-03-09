import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cityApi from './../../utils/CityApi';
import locationApi from './../../utils/LocationApi';
import NeighborhoodListItem from './NeighborhoodListItem';
import AddNeighborhood from './AddNeighborhood';
import AddLocation from './AddLocation';
import LocationListItem from './LocationListItem';

const propTypes = {
  cityId: PropTypes.string.isRequired,
};

export class City extends Component {
  constructor(props) {
    super(props);

    this.fetchCity = this.fetchCity.bind(this);
    this.postNeighborhood = this.postNeighborhood.bind(this);
    this.deleteNeighborhood = this.deleteNeighborhood.bind(this);
    this.postLocation = this.postLocation.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);

    this.state = {};

    this.fetchCity();
  }

  fetchCity() {
    cityApi.getCity(this.props.cityId).then((result) => {
      if (result.success) {
        this.setState({
          city: result.city,
        });
      }
    });
  }

  postNeighborhood(neighborhood) {
    cityApi.postNeighborhood(this.state.city._id, neighborhood).then(() => {
      this.fetchCity();
    });
  }

  deleteNeighborhood(neighborhoodId) {
    cityApi.deleteNeighborhood(this.state.city._id, neighborhoodId).then(() => {
      this.fetchCity();
    });
  }

  postLocation(location) {
    locationApi.postLocation(this.state.city._id, location).then(() => {
      this.fetchCity();
    });
  }

  deleteLocation(locationId) {
    locationApi.deleteLocation(this.state.city._id, locationId).then(() => {
      this.fetchCity();
    });
  }

  render() {
    if (!this.state.city) {
      return <div className="spinner" />;
    }
    const neighborhoods = !this.state.city.neighborhoods
      ? null
      : this.state.city.neighborhoods.map(neighborhood => (
        <NeighborhoodListItem
          cityId={this.state.city._id}
          deleteNeighborhood={this.deleteNeighborhood}
          key={neighborhood._id}
          neighborhood={neighborhood}
        />
      ));

    const locations = !this.state.city.locations
      ? null
      : this.state.city.locations.map(location => (
        <LocationListItem
          key={location._id}
          cityId={this.state.city._id}
          location={location}
          deleteLocation={this.deleteLocation}
        />
      ));

    return (
      <div className="container">
        <a className="button_sm .button_transparent" href="/admin">
          <i className="fas fa-arrow-left" /> back
        </a>
        <h1>{this.state.city.name}</h1>
        <div className="row">
          <div className="col-xs-12 col-xs-6">
            <div className="card col-xs-12">
              <h2 className="card-heading">Neighborhoods</h2>
              <AddNeighborhood postNeighborhood={this.postNeighborhood} />
              {neighborhoods}
            </div>
          </div>
          <div className="col-xs-12 col-xs-6">
            <div className="card col-xs-12">
              <h2 className="card-heading">Locations</h2>
              <AddLocation postLocation={this.postLocation} />
              {locations}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

City.propTypes = propTypes;

export default City;
