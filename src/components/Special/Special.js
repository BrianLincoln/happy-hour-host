import React, { Component } from 'react';
import './Special.scss';
import dayLabels from './../../utils/DayLabels';
import timeConverter from './../../utils/TimeConverter';

class Special extends Component {
  render() { 

    let days = this.props.days.map((day, index) => {      
      const isLast = index + 1 === this.props.days.length;
      const labelText = isLast ? dayLabels[day] : dayLabels[day] + ", ";

      return <label className="font-sm" key={day}>{labelText}</label>;
    });

    let times = this.props.times.map((time) => {
      const startTime = timeConverter(time.start);
      const endTime = timeConverter(time.end);

      return <div className="font-sm" key={time._id}>{startTime} - {endTime}</div>;
    });    

    return (      
      <li className="special row" key={this.props._id}>
        <div className="col-xs-10">
          <h3 className="space-bottom-xs">{this.props.headline}</h3>  
          {times}
        </div>
        <div className="col-xs-2 special-types">
          {this.props.hasDrinkSpecial ? <i className="fas fa-beer" aria-hidden="true"></i> : null}
          {this.props.hasFoodSpecial ? <i className="fas fa-utensils" aria-hidden="true"></i> : null}            
        </div>
        <div className="col-xs-12 font-base-alt special-details">{this.props.details}</div>
      </li>
    );
  }
}

export default Special;