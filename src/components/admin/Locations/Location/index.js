import React, { Component } from 'react';
import './Location.scss';

export class Location extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.props.handleLocationClick(this.props.location);
  }
  render() {

    return (
      <div className="list-item admin-location" onClick={this.handleClick}>
        <div className="row">
          <div className="col-xs-12 col-sm-8">
            <h2 className="font-title-md admin-location-name">{this.props.location.name}</h2>      
          </div>
        </div>        
      </div>
    )
  }
}

export default Location;