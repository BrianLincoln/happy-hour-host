import React, { Component } from 'react';
import MapSection from './../../components/MapSection/MapSection.js';

class Neighborhood extends Component {
    
    render() {         
        return (      
            <div>
                <h1>{this.props.neighborhood.name}</h1>
                <MapSection locations={this.props.locations} fetchingLocations={this.props.fetchingLocations} google={this.props.config.googleMapsApiKey} />
            </div>
        );
    }
  }
  
  export default Neighborhood;