import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import _ from 'lodash';
import config from '../../config';
import Filter from '../../components/Filter/Filter';
import Map from '../../components/Map/MapContainer';
import LocationsList from '../../components/Locations/LocationsList';
import locationApi from '../../utils/LocationApi';
import timeValues from '../../utils/TimeValues';
import locationFilter from '../../utils/LocationFilter';
import './MapSection.scss';

const defaultProps = {
  initialCenter: {
    latitude: 44.9778,
    longitude: -93.265,
  },
  initialZoom: 13,
};

const propTypes = {
  initialCenter: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  initialZoom: PropTypes.number,
};

export class MapSection extends Component {
  constructor(props) {
    super(props);

    this.filterLocations = this.filterLocations.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.handleLocationDeselect = this.handleLocationDeselect.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
    this.onMapUpdate = this.onMapUpdate.bind(this);
    this.updateActiveDays = this.updateActiveDays.bind(this);
    this.updateActiveTime = this.updateActiveTime.bind(this);

    const { initialCenter } = this.props;
    const now = new Date();
    const today = now.getDay();
    let hours = now.getHours();
    let activeTime;

    if (hours < 5) {
      hours += 24; // hacky way of dealing with times passed midnight
    }
    timeValues.forEach((time) => {
      if (hours >= time.start && hours < time.end) {
        activeTime = time;
      }
    });

    this.state = {
      locations: [],
      filteredLocations: [],
      selectedLocation: null,
      fetchingData: true,
      filters: {
        days: [today],
        time: activeTime,
      },
      bounds: [],
      initialCenter: {
        lat: initialCenter.latitude,
        lng: initialCenter.longitude,
      },
    };
  }

  componentDidMount() {
    window.addEventListener('popstate', this.handlePopState);

    locationApi.getLocations().then((result) => {
      this.setState({
        locations: result.locations,
      },
      () => this.filterLocations());
    });
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  onMapUpdate(bounds) {
    this.setState({
      bounds,
      fetchingData: false,
    },
    () => {
      this.filterLocations();
    });
  }

  filterLocations() {
    const {
      fetchingData, locations, bounds, filters,
    } = this.state;
    if (!fetchingData && locations.length > 0) {
      const filteredLocations = locationFilter.filter(
        locations,
        bounds,
        filters
      );

      this.setState({
        filteredLocations,
        resultsCapped: Boolean(filteredLocations.length === config.mapResultsCap),
      });
    }
  }

  handlePopState(event) {
    event.preventDefault();
    const { selectedLocation } = this.state;

    if (selectedLocation) {
      this.handleLocationDeselect();
    }
  }

  handleLocationSelect(location) {
    this.setState({
      selectedLocation: location || null,
    });

    if (window.location.href.indexOf('#') === -1) {
      window.history.pushState(
        location,
        `Map Selection - ${location.name}`,
        '#'
      );
    } else {
      window.history.replaceState(
        location,
        `Map Selection - ${location.name}`,
        '#'
      );
    }
  }

  handleLocationDeselect() {
    this.setState({
      selectedLocation: null,
    });
    window.history.replaceState(
      null, 'Happy Hour Host', '#'
    );
  }

  updateActiveDays(activeDays) {
    const { filters } = this.state;

    const newFilters = {
      days: activeDays || [],
      time: filters.time,
    };
    this.setState({
      filters: newFilters,
    },
    () => {
      this.filterLocations();
    });
  }

  updateActiveTime(timeValue) {
    const { filters } = this.state;
    const time = _.find(timeValues, {
      value: timeValue,
    });
    const newFilters = {
      days: filters.days,
      time,
    };
    this.setState({
      filters: newFilters,
    },
    () => {
      this.filterLocations();
    });
  }

  render() {
    const {
      filteredLocations,
      initialCenter,
      selectedLocation,
      filters,
      fetchingData,
      resultsCapped,
    } = this.state;
    const { initialZoom } = this.props;

    return (
      <div className="map-search-container">
        <Map
          centerAroundCurrentLocation
          locations={filteredLocations}
          onMapUpdate={this.onMapUpdate}
          initialMapCenter={initialCenter}
          initialZoom={initialZoom}
          handleLocationSelect={this.handleLocationSelect}
          handleLocationDeselect={this.handleLocationDeselect}
          selectedLocation={selectedLocation}
        />

        <div className="map-results-wrapper">
          {selectedLocation ? (
            <button
              type="button"
              onClick={this.handleLocationDeselect}
              className="map-results-back font-sm"
            >
              {'back to results'}
            </button>
          ) : (
            <Filter
              updateActiveDays={this.updateActiveDays}
              activeDays={filters.days}
              timeValues={timeValues}
              updateActiveTime={this.updateActiveTime}
              activeTime={filters.time}
            />
          )}

          <CSSTransition
            in={resultsCapped}
            timeout={300}
            classNames="results-cap-dislaimer"
            unmountOnExit
          >
            <div className="results-cap-dislaimer">
              Too many results, zoom in to see more
            </div>
          </CSSTransition>

          <LocationsList
            activeDays={filters.days}
            activeTime={filters.time}
            timeValues={timeValues}
            updateActiveDays={this.updateActiveDays}
            updateActiveTime={this.updateActiveTime}
            locations={filteredLocations}
            fetchingData={fetchingData}
            handleLocationDeselect={this.handleLocationDeselect}
            selectedLocation={selectedLocation}
            resultsCapped={resultsCapped}
          />
        </div>
      </div>
    );
  }
}

MapSection.defaultProps = defaultProps;
MapSection.propTypes = propTypes;

export default MapSection;
