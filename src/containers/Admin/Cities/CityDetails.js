import React, { Component } from 'react';
import cityApi from './../../../utils/CityApi';
import Neighborhoods from './neighborhoods/Neighborhoods';
import CityActions from './CityActions';
import './CityDetails.scss';

export class CityDetails extends Component {
  render() {
    return (
      <div className="admin-city-details">
        <CityActions {...this.props} />
        <Neighborhoods city={this.props._id} neighborhoods={this.props.neighborhoods} />
      </div>
    )
  }
}

export default CityDetails;