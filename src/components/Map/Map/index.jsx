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
    let currentLocation = {
      lat: this.props.initialCenter.lat,
      lng: this.props.initialCenter.lng,
    };

    if (this.props.centerAroundCurrentLocation && navigator && navigator.geolocation) {
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
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (this.state && (prevState && prevState.currentLocation) !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {
        google,
      } = this.props;

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
          this.props.onBoundsChange(this.map);
        }, 500));
      this.map.addListener('click', this.props.handleMapClick);
    }
  }

  recenterMap() {
    const curr = this.state.currentLocation;
    const {
      maps,
    } = this.props.google.maps;

    if (this.map) {
      const center = new maps.LatLng(curr.lat, curr.lng);
      this.map.panTo(center);
    }
  }

  renderChildren() {
    const {
      children,
    } = this.props;

    if (!children) return null;

    return React.Children.map(children, c =>
      React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
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
