import React, { Component } from 'react';
import LocationListItem from './LocationListItem';
import './LocationsList.scss';

class LocationsList extends Component {
  render() { 
    let locations = (
      <div className="card">
        <h2>No Results</h2>
        <p>Try zooming out or removing filters</p>
      </div>
    );  

    if (this.props.fetchingData) {
      locations = <div className="spinner"></div>;
    }

    if (this.props.selectedLocation) {
      locations = <LocationListItem cityName={this.props.cityName} key={this.props.selectedLocation._id} {...this.props.selectedLocation} /> 
    } else if (this.props.locations.length > 0) {
      locations = this.props.locations.map((location) => {
        return <LocationListItem cityName={this.props.cityName} key={location._id} {...location} /> 
      });  
    }
   
    return (
      <div className="location-list-wrapper">        
        <ul className="location-list">
          {locations}
        </ul>
      </div>
    );
  }
}

export default LocationsList;