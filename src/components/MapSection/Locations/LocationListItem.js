import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LocationListItem.scss';

class LocationListItem extends Component {
  render() { 
    return (        
        <li className="location-list-item">          
          <h3 className="location-list-item-name">{this.props.name}</h3>
          <Link to={
              {pathname: `/location/${this.props._id}`,
              state: {...this.props}}
            }>view more</Link>
        </li>
    );
  }
}

export default LocationListItem;