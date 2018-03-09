import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

const defaultProps = {
  google: undefined,
  map: undefined,
};

const propTypes = {
  isActive: PropTypes.bool.isRequired,
  handleMarkerClick: PropTypes.func.isRequired,
  google: PropTypes.shape({
    maps: PropTypes.object,
  }),
  map: PropTypes.shape({
    mapTypeId: PropTypes.string,
  }),
  location: PropTypes.shape({
    _id: PropTypes.string,
    position: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }).isRequired,
};

export class Marker extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    this.renderMarker();
  }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
      this.marker = null;
    }
  }

  handleClick() {
    this.props.handleMarkerClick(this.props.location, this.marker);
  }

  renderMarker() {
    const {
      google, map,
    } = this.props;

    const pos = {
      lat: this.props.location.position.latitude,
      lng: this.props.location.position.longitude,
    };

    const position = new google.maps.LatLng(pos.lat, pos.lng);

    const icon = {
      path:
        'M32.333,0C14.462,0,0,14.519,0,32.39c0,20.343,14.711,27.647,20.052,35.519S31.39,84.438,32.333,100 c0.944-15.518,6.19-23.074,11.995-32.092c5.806-9.018,20.395-17.648,20.395-35.519S50.203,0,32.333,0z M32.361,26.114 c3.201,0,5.797,2.595,5.797,5.796s-2.596,5.796-5.797,5.796s-5.796-2.595-5.796-5.796S29.16,26.114,32.361,26.114z',

      fillColor: this.props.isActive ? '#218ACC' : '#d73838',
      fillOpacity: 1,
      anchor: new google.maps.Point(50, 70),
      strokeWeight: 1,
      strokeColor: '#fff',
      scale: 0.4,
    };

    const pref = {
      map,
      position,
      icon,
    };
    if (this.marker) {
      this.marker.setMap(null);
      this.marker = null;
    }
    this.marker = new google.maps.Marker(pref);

    this.marker.addListener('click', this.handleClick);
  }

  render() {
    this.renderMarker();

    return null;
  }
}

Marker.defaultProps = defaultProps;
Marker.propTypes = propTypes;

export default Marker;
