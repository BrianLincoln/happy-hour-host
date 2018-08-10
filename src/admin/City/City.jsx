import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cityApi from '../../utils/CityApi';
import locationApi from '../../utils/LocationApi';
import NeighborhoodListItem from './NeighborhoodListItem/NeighborhoodListItem';
import AddNeighborhood from './AddNeighborhood/AddNeighborhood';
import AddLocation from './AddLocation/AddLocation';
import LocationListItem from './LocationListItem/LocationListItem';

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
    this.fetchLocations();
  }

  fetchCity() {
    const { cityId } = this.props;

    cityApi.getCity(cityId).then((result) => {
      if (result.success) {
        this.setState({
          city: result.city,
        });
      }
    });
  }

  fetchLocations() {
    const { cityId } = this.props;
    locationApi.getLocationsByCity(cityId).then((result) => {
      if (result.success) {
        this.setState({
          locations: result.locations,
        });
      }
    });
  }

  postNeighborhood(neighborhood) {
    const {
      city: { _id },
    } = this.state;

    cityApi.postNeighborhood(_id, neighborhood).then(() => {
      this.fetchCity();
    });
  }

  deleteNeighborhood(neighborhoodId) {
    const {
      city: { _id },
    } = this.state;

    cityApi.deleteNeighborhood(_id, neighborhoodId).then(() => {
      this.fetchCity();
    });
  }

  postLocation(location) {
    locationApi.postLocation(location).then(() => {
      this.fetchLocations();
    });
  }

  deleteLocation(locationId) {
    locationApi.deleteLocation(locationId).then(() => {
      this.fetchLocations();
    });
  }

  render() {
    const {
      city, locations,
    } = this.state;

    if (!city) {
      return <div className="spinner" />;
    }
    const neighborhoodsComponent = !city.neighborhoods
      ? null
      : city.neighborhoods.map(neighborhood => (
        <NeighborhoodListItem
          cityId={city._id}
          deleteNeighborhood={this.deleteNeighborhood}
          key={neighborhood._id}
          neighborhood={neighborhood}
        />
      ));

    const locationsComponent = !locations
      ? null
      : locations.map(location => (
        <LocationListItem
          key={location._id}
          cityId={city._id}
          location={location}
          deleteLocation={this.deleteLocation}
        />
      ));

    return (
      <div className="container">
        <a className="button_sm .button_transparent" href="/admin">
          <i className="fas fa-arrow-left" /> back
        </a>
        <h1>{city.name}</h1>
        <div className="row">
          <div className="col-xs-12 col-xs-6">
            <div className="card col-xs-12">
              <h2 className="card-heading">Neighborhoods</h2>
              <AddNeighborhood postNeighborhood={this.postNeighborhood} />
              {neighborhoodsComponent}
            </div>
          </div>
          <div className="col-xs-12 col-xs-6">
            <div className="card col-xs-12">
              <h2 className="card-heading">Locations</h2>
              <AddLocation cityId={city._id} postLocation={this.postLocation} />
              {locationsComponent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

City.propTypes = propTypes;

export default City;
