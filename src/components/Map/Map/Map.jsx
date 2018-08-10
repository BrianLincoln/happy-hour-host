import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './Map.scss';

const defaultProps = {
  children: [],
  zoom: 13,
  initialCenter: {
    lat: 0,
    lng: 0,
  },
  centerAroundCurrentLocation: false,
};

const propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
  google: PropTypes.shape({
    maps: PropTypes.object,
  }).isRequired,
  zoom: PropTypes.number,
  initialCenter: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  centerAroundCurrentLocation: PropTypes.bool,
  onBoundsChange: PropTypes.func.isRequired,
  handleMapClick: PropTypes.func.isRequired,
};

class Map extends Component {
  constructor(props) {
    super(props);

    this.renderChildren = this.renderChildren.bind(this);
  }

  componentWillMount() {
    const {
      initialCenter, centerAroundCurrentLocation,
    } = this.props;

    let currentLocation = {
      lat: initialCenter.lat,
      lng: initialCenter.lng,
    };

    if (centerAroundCurrentLocation && navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        currentLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
      });
    }

    this.setState({
      currentLocation,
    },
    () => {
      this.loadMap();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { google } = this.props;
    const { currentLocation } = this.state;

    if (prevProps.google !== google) {
      this.loadMap();
    }
    if (
      this.state
      && (prevState && prevState.currentLocation) !== currentLocation
    ) {
      this.recenterMap();
    }
  }

  loadMap() {
    const {
      google, onBoundsChange, handleMapClick,
    } = this.props;

    if (this.props && google) {
      const node = this.mapRef;

      const {
        initialCenter, zoom,
      } = this.props;
      const {
        lat, lng,
      } = initialCenter;
      const center = new google.maps.LatLng(lat, lng);
      const mapConfig = Object.assign({},
        {
          center,
          zoom,
          styles: [
            {
              featureType: 'poi',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
          ],
        });

      this.map = new google.maps.Map(node, mapConfig);

      this.map.addListener('bounds_changed',
        _.debounce(() => {
          onBoundsChange(this.map);
        }, 500));
      this.map.addListener('click', handleMapClick);
    }
  }

  recenterMap() {
    const { currentLocation } = this.state;
    const {
      google: { maps },
    } = this.props;

    if (this.map) {
      const center = new maps.LatLng(currentLocation.lat, currentLocation.lng);
      this.map.panTo(center);
    }
  }

  renderChildren() {
    const {
      children, google,
    } = this.props;

    if (!children) return null;

    return React.Children.map(children, c => React.cloneElement(c, {
      map: this.map,
      google,
    }));
  }

  render() {
    return (
      <div
        ref={(c) => {
          this.mapRef = c;
        }}
      >
        {this.renderChildren()}
      </div>
    );
  }
}

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;
