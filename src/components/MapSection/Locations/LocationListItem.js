import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SpecialPreview from './../../Special/SpecialPreview';
import './LocationListItem.scss';

class LocationListItem extends Component {
  
  render() {
    let specials = this.props.specials ? this.props.specials.map((special) => {
      return <SpecialPreview key={special._id} {...special} />
    }) 
    : null;

    return (        
        <Link className="location-list-item" to={{pathname: `/location/${this.props._id}`, state: {...this.props}}}>
            <h3>{this.props.name}</h3>
            <ul className="location-list-item-specials">
              {specials}
            </ul>             
        </Link>
    );
  }
}

export default LocationListItem;