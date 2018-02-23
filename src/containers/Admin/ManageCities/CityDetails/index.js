import React, { Component } from 'react';
import NeighborhoodList from './../NeighborhoodList/';
import CityActions from './../CityActions/';
import './CityDetails.scss';

export class CityDetails extends Component {
  render() {
    return (
      <div className="admin-city-details">
        <CityActions {...this.props} />
        <NeighborhoodList {...this.props} cityId={this.props._id} />
      </div>
    )
  }
}

export default CityDetails;