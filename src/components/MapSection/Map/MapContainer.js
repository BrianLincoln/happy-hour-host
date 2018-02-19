import React, { Component } from 'react';
import GoogleApiComponent from './GoogleApiComponent';
import Map from './Map';
import Marker from './Marker';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.onBoundsChange = this.onBoundsChange.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    
    this.state = {
      markers: [],
      updateCount: 0,
      showingInfoWindow: false,
      activeMarker: {}
    }
  }
  onBoundsChange(map) {
    const mapBounds = map.getBounds();
    const ne = mapBounds.getNorthEast();
    const sw = mapBounds.getSouthWest();
    if (ne && sw) {
      const formattedBounds = {
        ne: ne,
        sw: sw
      }

      this.props.onMapUpdate(formattedBounds);
    }
  }
  handleMapClick() {
    this.props.handleLocationDeselect();
  }
  render() {
    if (!this.props.loaded) {
      return <div className="spinner"></div>   
    }
    
    const markers = this.props.locations.map((location) => {
      const pos = {lat: location.position.latitude, lng: location.position.longitude}
      const isActive = this.props.selectedLocation && (location._id === this.props.selectedLocation._id);

      return <Marker key={location._id} isActive={isActive} position={pos} handleMarkerClick={this.props.handleLocationSelect} location={location} /> 
    });
    return (
      <div className="map-container">
        <Map google={this.props.google}          
          className={'map'}
          zoom={12}
          centerAroundCurrentLocation={true}
          initialMapCenter={this.props.initialMapCenter}
          onBoundsChange={this.onBoundsChange}
          handleMapClick={this.handleMapClick}
          updateCount={this.state.updateCount}>
            {markers}      
          </Map>
      </div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: "AIzaSyDDbQf_9nZK-1G-P3X4dq21N1lMFedYIEs"
})(MapContainer)