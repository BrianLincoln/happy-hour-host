import React, { Component } from 'react';
import MapSection from './../../components/MapSection/MapSection.js';

export class City extends Component {
  render() {
    return (
      <div>
        <MapSection google={this.props.config.googleMapsApiKey} />
      </div>
    )
  }
}

export default City;