import React, { Component } from 'react';
import PropTypes from 'prop-types';
import locationFilter from '../../utils/LocationFilter';
import cityApi from '../../utils/CityApi';
import locationApi from '../../utils/LocationApi';
import MapSection from '../MapSection/MapSection';
import LocationListItem from '../../components/Locations/LocationListItem';
import './Neighborhood.scss';

const defaultProps = {
  locations: [],
  neighborhood: null,
  fetchingLocations: false,
};

const propTypes = {
  cityId: PropTypes.string.isRequired,
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

    const {
      neighborhood, locations, cityName, neighborhoodName,
    } = this.props;

    this.state = {
      neighborhood: neighborhood || null,
      neighborhoodLocations: [],
      locations: locations || [],
    };

    this.fetchNeighborhood = this.fetchNeighborhood.bind(this);
    this.fetchLocations = this.fetchLocations.bind(this);
    this.setDocumentTitle = this.setDocumentTitle.bind(this);
    this.setNeighborhoodLocations = this.setNeighborhoodLocations.bind(this);

    if (!neighborhood) {
      this.fetchNeighborhood(cityName, neighborhoodName);
    }
    if (!locations) {
      this.fetchLocations();
    }
  }

  componentDidMount() {
    const {
      locations, neighborhood,
    } = this.state;

    if (locations && neighborhood) {
      this.setDocumentTitle();
      this.setNeighborhoodLocations(locations, neighborhood.mapPoly);
    }
  }

  setDocumentTitle() {
    const {
      neighborhood: { name },
    } = this.state;

    const { cityName } = this.props;

    document.title = `${name} Happy Hours - Food & Drink Specials in ${name}, ${cityName}`;
  }

  // This should happen server side
  setNeighborhoodLocations(locations, mapPoly) {
    const { neighborhoodLocations } = this.state;

    if (neighborhoodLocations.length === 0) {
      const filteredLocations = locationFilter.filterByMapPoly(locations,
        mapPoly);
      this.setState({
        neighborhoodLocations: filteredLocations,
      });
    }
  }

  fetchLocations() {
    const {
      locations, neighborhood,
    } = this.state;

    locationApi.getLocations().then((result) => {
      if (result.success) {
        this.setState({
          locations: result.locations,
        },
        () => {
          this.setNeighborhoodLocations(locations, neighborhood.mapPoly);
        });
      }
    });
  }

  fetchNeighborhood(cityName, neighborhoodName) {
    const {
      locations, neighborhood,
    } = this.state;

    cityApi
      .getNeighborhoodByDisplayNames(cityName, neighborhoodName)
      .then((result) => {
        if (result.success) {
          this.setState({
            neighborhood: result.neighborhood,
          },
          () => {
            this.setDocumentTitle();
            this.setNeighborhoodLocations(locations, neighborhood.mapPoly);
          });
        }
      });
  }

  render() {
    const {
      locations, neighborhood, neighborhoodLocations,
    } = this.state;

    const {
      cityId, cityName, fetchingLocations, config,
    } = this.props;

    if (!neighborhood || !locations) {
      return <div className="spinner" />;
    }
    const neighborhoodLocationsComponent = neighborhoodLocations.map(location => (
      <LocationListItem
        key={location._id}
        cityName={cityName}
        {...location}
      />
    ));

    return (
      <div>
        <MapSection
          cityId={cityId}
          cityName={cityName}
          initialZoom={neighborhood.mapZoomLevel}
          initialCenter={neighborhood.mapCenter}
          locations={locations}
          fetchingLocations={fetchingLocations}
          google={config.googleMapsApiKey}
        />
        <section className="neighborhood-all-locations">
          <div className="container">
            <h1 className="align-center space-bottom-xl space-top-xl">
              All Happy Hours in {neighborhood.name},{' '}
              {cityName}
            </h1>
            <div className="row">
              <div className="col-xs-12 col-sm-7">
                <div className="card col-xs-12 neighborhood-location-list">
                  {neighborhoodLocationsComponent}
                </div>
              </div>
              <div className="col-xs-12 col-sm-5">
                <div className="card col-xs-12 neighborhood-text">
                  <h2 className="card-heading">
                    Find the best food and drink specials in{' '}
                    {neighborhood.name}
                  </h2>
                  <p>
                    Happy Hour Host is the best way to find happy hours in{' '}
                    {neighborhood.name}, {cityName}. Use
                    our{' '}
                    <a href="/" title="home page">
                      full map
                    </a>{' '}
                    to find food and drink specials in{' '}
                    {neighborhood.name} right now. You can filter by
                    day of the week and time to find the best happy hours where
                    and when you want.
                  </p>
                  <p>
                    {
                      "Whether you're looking for lunch specials, food specials, drink specials, 2 for 1s / buy on get one, or just cheap drinks Happy Hour Host has you covered."
                    }
                  </p>
                  <p>
                    Help us help you by reporting any missing or innacurate
                    happy hour information. Email us at{' '}
                    <a href="mailto:thehappyhourhost@gmail.com">
                      thehappyhourhost@gmail.com
                    </a>
                    . It really helps if you can send a link or image of an
                    accurate menu.
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
