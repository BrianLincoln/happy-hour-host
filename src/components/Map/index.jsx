import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleApiComponent from './GoogleApiComponent';
import Map from './Map';
import Marker from './Map/Marker';

const defaultProps = {
  locations: null,
  selectedLocation: null,
  google: null,
};

const propTypes = {
  centerAroundCurrentLocation: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
  })),
  onMapUpdate: PropTypes.func.isRequired,
  initialMapCenter: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  handleLocationSelect: PropTypes.func.isRequired,
  handleLocationDeselect: PropTypes.func.isRequired,
  selectedLocation: PropTypes.shape({
    _id: PropTypes.string,
  }),
  initialZoom: PropTypes.number.isRequired,

  loaded: PropTypes.bool.isRequired,
  google: PropTypes.shape({
    maps: PropTypes.object,
  }),
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.onBoundsChange = this.onBoundsChange.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  onBoundsChange(map) {
    const mapBounds = map.getBounds();
    const ne = mapBounds.getNorthEast();
    const sw = mapBounds.getSouthWest();
    if (ne && sw) {
      const formattedBounds = {
        ne,
        sw,
      };

      this.props.onMapUpdate(formattedBounds);
    }
  }

  handleMapClick() {
    this.props.handleLocationDeselect();
  }

  render() {
    if (!this.props.loaded) {
      return <div className="spinner" />;
    }

    const markers = this.props.locations.map((location) => {
      const isActive =
        this.props.selectedLocation !== null && this.props.selectedLocation._id === location._id;

      return (
        <Marker
          key={location._id}
          isActive={isActive}
          handleMarkerClick={this.props.handleLocationSelect}
          location={location}
        />
      );
    });

    return (
      <div className="map-container">
        <Map
          google={this.props.google}
          className="map"
          zoom={this.props.initialZoom}
          centerAroundCurrentLocation={this.props.centerAroundCurrentLocation}
          initialCenter={this.props.initialMapCenter}
          onBoundsChange={this.onBoundsChange}
          handleMapClick={this.handleMapClick}
        >
          {markers}
        </Map>
      </div>
    );
  }
}

MapContainer.defaultProps = defaultProps;
MapContainer.propTypes = propTypes;

export default GoogleApiComponent({
  apiKey: 'AIzaSyDDbQf_9nZK-1G-P3X4dq21N1lMFedYIEs',
})(MapContainer);
