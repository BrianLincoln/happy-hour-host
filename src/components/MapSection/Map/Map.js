import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Map.scss';
import _ from 'lodash';

class Map extends Component {
  constructor(props) {
    super(props);
    this.renderChildren = this.renderChildren.bind(this);
  }  
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation 
        && navigator 
        && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((pos) => {
            const coords = pos.coords;
            this.setState({
              currentLocation: {
                lat: coords.latitude,
                lng: coords.longitude
                  }
            });
          });
    } else {
      this.setState({
        currentLocation: {
          lat: this.props.initialMapCenter.lat,
          lng: this.props.initialMapCenter.long
        }
      });
    }
    this.loadMap();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (this.state && (prevState && prevState.currentLocation) !== this.state.currentLocation) {
      this.recenterMap();
    }
    if (prevProps.children !== this.props.children) {
      this.renderChildren();
    }
  }
  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let {initialMapCenter, zoom} = this.props;
      const {lat, lng} = initialMapCenter;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom,
        styles: [
          {
            featureType: 'poi',
            stylers: [{visibility: 'off'}]
          }
        ]
      })
      
      this.map = new maps.Map(node, mapConfig);

      this.map.addListener('bounds_changed', _.debounce(() => {        
        this.props.onBoundsChange(this.map);
      }, 500));
      this.map.addListener('click', this.props.handleMapClick);
    }
  }
  recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
        let center = new maps.LatLng(curr.lat, curr.lng)
        map.panTo(center)
    }
  }   
  renderChildren() {
    const {children} = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google
      });
    });
  }
  render() {
    return (
      <div ref='map'>   
        {this.renderChildren()}
      </div>
    )
  }
}

Map.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool,
  onMapUpdate: PropTypes.func
}

Map.defaultProps = {
  zoom: 13,
  initialCenter: {
    lat: 0,
    lng: 0
  },
  centerAroundCurrentLocation: false
}

export default Map;