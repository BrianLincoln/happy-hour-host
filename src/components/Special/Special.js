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
        <li className="special">
          <div className="special-headline">{this.props.headline}</div>
          <div className="special-details">{this.props.details}</div>
          <div className="special-days-wrapper">
            <i className="fa fa-calendar special-icon" aria-hidden="true"></i> 
            <div className="special-days">
              {days}
            </div>
          </div>
          <div className="special-times-wrapper">
            <i className="fa fa-clock-o special-icon" aria-hidden="true"></i> 
            <div className="special-times">
              {times}
            </div>
          </div>
        </li>
    );
  }
}

export default Special;