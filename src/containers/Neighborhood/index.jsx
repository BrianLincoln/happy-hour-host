import React, { Component } from 'react';
import PropTypes from 'prop-types';
import locationFilter from './../../utils/LocationFilter';
import cityApi from './../../utils/CityApi';
import locationApi from './../../utils/LocationApi';
import MapSection from './../MapSection/';
import LocationListItem from './../../components/Locations/LocationListItem';
import './Neighborhood.scss';

const defaultProps = {
  locations: [],
  neighborhood: null,
  fetchingLocations: false,
};

const propTypes = {
  cityName: PropTypes.string.isRequired,
  fetchingLocations: PropTypes.bool,
  neighborhoodName: PropTypes.string.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object),
  neighborhood: PropTypes.shape({
    _id: PropTypes.string,
  }),
  config: PropTypes.shape({
    googleMapsApiKey: PropTypes.string,
  }).isRequired,
};

class Neighborhood extends Component {
  constructor(props) {
    super(props);

    this.fetchNeighborhood = this.fetchNeighborhood.bind(this);
    this.fetchLocations = this.fetchLocations.bind(this);
    this.setDocumentTitle = this.setDocumentTitle.bind(this);
    this.setNeighborhoodLocations = this.setNeighborhoodLocations.bind(this);

    this.state = {
      neighborhood: this.props.neighborhood ? this.props.neighborhood : null,
      neighborhoodLocations: [],
      locations: this.props.locations ? this.props.locations : [],
    };

    if (!this.props.neighborhood) {
      this.fetchNeighborhood(this.props.cityName, this.props.neighborhoodName);
    }
    if (!this.props.locations) {
      this.fetchLocations();
    }
  }

  componentDidMount() {
    if (this.state.locations && this.state.neighborhood) {
      this.setDocumentTitle();
      this.setNeighborhoodLocations(this.state.locations, this.state.neighborhood.mapPoly);
    }
  }

  setDocumentTitle() {
    document.title = `${this.state.neighborhood.name} Happy Hours - Food & Drink Specials in ${
      this.state.neighborhood.name
    }, ${this.props.cityName}`;
  }

  setNeighborhoodLocations(locations, mapPoly) {
    if (this.state.neighborhoodLocations.length === 0) {
      const filteredLocations = locationFilter.filterByMapPoly(locations, mapPoly);
      this.setState({
        neighborhoodLocations: filteredLocations,
      });
    }
  }

  fetchLocations() {
    locationApi.getLocations().then((result) => {
      if (result.success) {
        this.setState({
          locations: result.locations,
        },
        () => {
          this.setNeighborhoodLocations(this.state.locations, this.state.neighborhood.mapPoly);
        });
      }
    });
  }

  fetchNeighborhood(cityName, neighborhoodName) {
    cityApi.getNeighborhoodByDisplayNames(cityName, neighborhoodName).then((result) => {
      if (result.success) {
        this.setState({
          neighborhood: result.neighborhood,
        },
        () => {
          this.setDocumentTitle();
          this.setNeighborhoodLocations(this.state.locations, this.state.neighborhood.mapPoly);
        });
      }
    });
  }

  render() {
    if (!this.state.neighborhood || !this.state.locations) {
      return <div className="spinner" />;
    }
    const neighborhoodLocations = this.state.neighborhoodLocations.map(location => (
      <LocationListItem key={location._id} cityName={this.props.cityName} {...location} />
    ));

    return (
      <div>
        <MapSection
          cityName={this.props.cityName}
          initialZoom={this.state.neighborhood.mapZoomLevel}
          initialCenter={this.state.neighborhood.mapCenter}
          locations={this.state.locations}
          fetchingLocations={this.props.fetchingLocations}
          google={this.props.config.googleMapsApiKey}
        />
        <section className="neighborhood-all-locations">
          <div className="container">
            <h1 className="align-center space-bottom-xl space-top-xl">
              All Happy Hours in {this.state.neighborhood.name}, {this.props.cityName}
            </h1>
            <div className="row">
              <div className="col-xs-12 col-sm-7">
                <div className="card col-xs-12 neighborhood-location-list">
                  {neighborhoodLocations}
                </div>
              </div>
              <div className="col-xs-12 col-sm-5">
                <div className="card col-xs-12 neighborhood-text">
                  <h2 className="card-heading">
                    Find the best food and drink specials in {this.state.neighborhood.name}
                  </h2>
                  <p>
                    Happy Hour Host is the best way to find happy hours in{' '}
                    {this.state.neighborhood.name}, {this.props.cityName}. Use our{' '}
                    <a href="/" title="home page">
                      full map
                    </a>{' '}
                    to find food and drink specials in {this.state.neighborhood.name} right now. You
                    can filter by day of the week and time to find the best happy hours where and
                    when you want.
                  </p>
                  <p>
                    {
                      "Whether you're looking for lunch specials, food specials, drink specials, 2 for 1s / buy on get one, or just cheap drinks Happy Hour Host has you covered."
                    }
                  </p>
                  <p>
                    Help us help you by reporting any missing or innacurate happy hour information.
                    Email us at{' '}
                    <a href="mailto:thehappyhourhost@gmail.com">thehappyhourhost@gmail.com</a>. It
                    really helps if you can send a link or image of an accurate menu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Neighborhood.defaultProps = defaultProps;
Neighborhood.propTypes = propTypes;

export default Neighborhood;
