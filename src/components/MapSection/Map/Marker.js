import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Marker extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    this.renderMarker();    
  }  
  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
      this.marker=null;
    }
  }  
  handleClick(event) {
    this.props.handleMarkerClick(this.props.location, this.marker);
  }  
  renderMarker() {
    let {
      map, google, position, mapCenter
    } = this.props;

    let pos = position || mapCenter;
    position = new google.maps.LatLng(pos.lat, pos.lng);
    
    const icon = {        
        path: "M32.333,0C14.462,0,0,14.519,0,32.39c0,20.343,14.711,27.647,20.052,35.519S31.39,84.438,32.333,100 c0.944-15.518,6.19-23.074,11.995-32.092c5.806-9.018,20.395-17.648,20.395-35.519S50.203,0,32.333,0z M32.361,26.114 c3.201,0,5.797,2.595,5.797,5.796s-2.596,5.796-5.797,5.796s-5.796-2.595-5.796-5.796S29.16,26.114,32.361,26.114z",
        

        fillColor: this.props.isActive ? "#24c9f2" : '#d73838',
        fillOpacity: 1,
        anchor: new google.maps.Point(50, 70),
        strokeWeight: 1,
        strokeColor: '#fff',
        scale: .4
    };

    const pref = {
      map: map,
      position: position,
      icon: icon
    };
    if (this.marker) {
      this.marker.setMap(null);
      this.marker=null;
    }    
    this.marker = new google.maps.Marker(pref);

    this.marker.addListener('click', this.handleClick);    
  }
  render() {
    this.renderMarker();
    return null;
  }  
}

export default Marker;

Marker.propTypes = {
  position: PropTypes.object,
  map: PropTypes.object
}