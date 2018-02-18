import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import timeConverter from './../../../utils/TimeConverter';
import './LocationListItem.scss';

class LocationListItem extends Component {
  format
  render() { 

    let specials = this.props.specials.map((special) => {
      let times = special.times.map((time) => {
        const startTime = timeConverter(time.start);
        const endTime = timeConverter(time.end);
  
        return <div className="font-sm" key={time._id}>{startTime} - {endTime}</div>;
      });   

      return (
        <li className="location-list-item-special row" key={special._id}>
          <div className="col-xs-9">
            <div className="space-bottom-xs">{special.headline}</div>  
            {times}
          </div>
          <div className="col-xs-3 special-types">
            <i className="special-type-icon fas fa-utensils" aria-hidden="true"></i> 
            <i className="special-type-icon fas fa-beer" aria-hidden="true"></i>  
          </div>
        </li>
      );
    });

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