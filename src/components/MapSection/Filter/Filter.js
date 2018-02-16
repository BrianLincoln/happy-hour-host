import React, { Component } from 'react';
import Day from './Day';
import TimeFilter from './TimeFilter';
import dayLabels from './../../../utils/DayLabels';
import './Filter.scss';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleDayClick(day) {
    const isActive = this.props.activeDays.indexOf(day) > -1;
    const activeDays = this.props.activeDays;

    if (isActive) {
      activeDays.splice(activeDays.indexOf(day), 1);
    } else {
      activeDays.push(day);
    }

    this.props.updateActiveDays(activeDays);
  }

  handleTimeChange(time) {
    this.props.updateActiveTime(time);
  }

  render() { 
    let dayFilters = dayLabels.map((day, index) => {
      const isActive = this.props.activeDays.indexOf(index) > -1;
      
      return <Day key={index} dayNumber={index} isActive={isActive} text={day} handleDayClick={this.handleDayClick} />
    });    
    return (
    <nav className="filters-wrapper">
      <div className="day-filter-wrapper">
        {dayFilters}
      </div>
      <TimeFilter activeTime={this.props.activeTime} timeValues={this.props.timeValues} handleTimeChange={this.handleTimeChange} />
    </nav>
    );
  }
}

export default Filter;