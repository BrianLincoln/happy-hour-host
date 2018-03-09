import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Filter from './../../components/Filter/';
import Map from './../../components/Map/';
import LocationsList from './../../components/Locations/LocationsList';
import timeValues from './../../utils/TimeValues';
import locationFilter from './../../utils/LocationFilter';
import './MapSection.scss';

const defaultProps = {
  locations: [],
  initialCenter: {
    latitude: 44.9778,
    longitude: -93.265,
  },
  initialZoom: 13,
  fetchingData: false,
};

const propTypes = {
  cityName: PropTypes.string.isRequired,
  fetchingData: PropTypes.bool,
  initialCenter: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  initialZoom: PropTypes.number,
  locations: PropTypes.arrayOf(PropTypes.object),
};

export class MapSection extends Component {
  constructor(props) {
    super(props);

    this.setLocations = this.setLocations.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.handleLocationDeselect = this.handleLocationDeselect.bind(this);
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
      selectedLocation: null,
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

  onMapUpdate(bounds) {
    this.setState({
      bounds,
    },
    () => {
      this.setLocations();
    });
  }

  setLocations() {
    if (!this.props.fetchingData && this.props.locations.length > 0) {
      const filteredLocations = locationFilter.filter(
        this.props.locations,
        this.state.bounds,
        this.state.filters,
      );
      this.setState({
        locations: filteredLocations,
      });
    }
  }

  handleLocationSelect(locationId) {
    this.setState({
      selectedLocation: locationId || null,
    });
  }

  handleLocationDeselect() {
    this.setState({
      selectedLocation: null,
    });
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
      this.setLocations();
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
      this.setLocations();
    });
  }

  render() {
    return (
      <div className="map-search-container">
        <Map
          centerAroundCurrentLocation
          locations={this.state.locations}
          onMapUpdate={this.onMapUpdate}
          initialMapCenter={this.state.initialCenter}
          initialZoom={this.props.initialZoom}
          handleLocationSelect={this.handleLocationSelect}
          handleLocationDeselect={this.handleLocationDeselect}
          selectedLocation={this.state.selectedLocation}
        />

        <div className="map-results-wrapper">
          {this.state.selectedLocation ? (
            <button onClick={this.handleLocationDeselect} className="map-results-back font-sm">
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
            cityName={this.props.cityName}
            timeValues={timeValues}
            updateActiveDays={this.updateActiveDays}
            updateActiveTime={this.updateActiveTime}
            locations={this.state.locations}
            fetchingData={this.props.fetchingData}
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
