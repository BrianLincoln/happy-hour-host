import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Filter from './../../components/Filter/';
import Map from './../../components/Map/';
import LocationsList from './../../components/Locations/LocationsList';
import locationApi from '../../utils/LocationApi';
import timeValues from './../../utils/TimeValues';
import locationFilter from './../../utils/LocationFilter';
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
        lat: this.props.initialCenter.latitude,
        lng: this.props.initialCenter.longitude,
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
    if (!this.state.fetchingData && this.state.locations.length > 0) {
      const filteredLocations = locationFilter.filter(
        this.state.locations,
        this.state.bounds,
        this.state.filters
      );
      this.setState({
        filteredLocations,
      });
    }
  }

  handlePopState(event) {
    event.preventDefault();

    if (this.state.selectedLocation) {
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
    const filters = {
      days: activeDays || [],
      time: this.state.filters.time,
    };
    this.setState({
      filters,
    },
    () => {
      this.filterLocations();
    });
  }

  updateActiveTime(timeValue) {
    const time = _.find(timeValues, {
      value: timeValue,
    });
    const filters = {
      days: this.state.filters.days,
      time,
    };
    this.setState({
      filters,
    },
    () => {
      this.filterLocations();
    });
  }

  render() {
    return (
      <div className="map-search-container">
        <Map
          centerAroundCurrentLocation
          locations={this.state.filteredLocations}
          onMapUpdate={this.onMapUpdate}
          initialMapCenter={this.state.initialCenter}
          initialZoom={this.props.initialZoom}
          handleLocationSelect={this.handleLocationSelect}
          handleLocationDeselect={this.handleLocationDeselect}
          selectedLocation={this.state.selectedLocation}
        />

        <div className="map-results-wrapper">
          {this.state.selectedLocation ? (
            <button
              onClick={this.handleLocationDeselect}
              className="map-results-back font-sm"
            >
              {'back to results'}
            </button>
          ) : (
            <Filter
              updateActiveDays={this.updateActiveDays}
              activeDays={this.state.filters.days}
              timeValues={timeValues}
              updateActiveTime={this.updateActiveTime}
              activeTime={this.state.filters.time}
            />
          )}
          <LocationsList
            activeDays={this.state.filters.days}
            activeTime={this.state.filters.time}
            timeValues={timeValues}
            updateActiveDays={this.updateActiveDays}
            updateActiveTime={this.updateActiveTime}
            locations={this.state.filteredLocations}
            fetchingData={this.state.fetchingData}
            handleLocationDeselect={this.handleLocationDeselect}
            selectedLocation={this.state.selectedLocation}
          />
        </div>
      </div>
    );
  }
}

MapSection.defaultProps = defaultProps;
MapSection.propTypes = propTypes;

export default MapSection;
