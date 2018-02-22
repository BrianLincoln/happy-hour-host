import React, { Component } from 'react';
import NeighborhoodList from './../NeighborhoodList/';
import CityActions from './../CityActions/';
import './CityDetails.scss';

export class CityDetails extends Component {
  render() {
    return (
      <div className="admin-city-details">
        <CityActions {...this.props} />
        <NeighborhoodList cityId={this.props._id} neighborhoods={this.props.neighborhoods} />
      </div>
    )
  }
}

export default CityDetails;