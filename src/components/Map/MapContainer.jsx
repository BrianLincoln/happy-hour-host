import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleApiComponent from './GoogleApiComponent';
import Map from './Map/Map';
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
    const { onMapUpdate } = this.props;
    const mapBounds = map.getBounds();
    const ne = mapBounds.getNorthEast();
    const sw = mapBounds.getSouthWest();
    if (ne && sw) {
      const formattedBounds = {
        ne,
        sw,
      };

      onMapUpdate(formattedBounds);
    }
  }

  handleMapClick() {
    const { handleLocationDeselect } = this.props;

    handleLocationDeselect();
  }

  render() {
    const {
      loaded,
      locations,
      selectedLocation,
      handleLocationSelect,
      google,
      initialZoom,
      centerAroundCurrentLocation,
      initialMapCenter,
    } = this.props;

    if (!loaded) {
      return <div className="spinner" />;
    }

    const markers = locations.map((location) => {
      const isActive = selectedLocation !== null && selectedLocation._id === location._id;

      return (
        <Marker
          key={location._id}
          isActive={isActive}
          handleMarkerClick={handleLocationSelect}
          location={location}
        />
      );
    });

    return (
      <div className="map-container">
        <Map
          google={google}
          className="map"
          zoom={initialZoom}
          centerAroundCurrentLocation={centerAroundCurrentLocation}
          initialCenter={initialMapCenter}
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
