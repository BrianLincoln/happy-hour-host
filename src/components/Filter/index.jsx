import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Day from './Day';
import TimeFilter from './TimeFilter';
import dayLabels from './../../utils/DayLabels';
import './Filter.scss';

const propTypes = {
  activeDays: PropTypes.arrayOf(PropTypes.number).isRequired,
  activeTime: PropTypes.shape({
    label: PropTypes.string,
  }).isRequired,
  timeValues: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
  })).isRequired,
  updateActiveDays: PropTypes.func.isRequired,
  updateActiveTime: PropTypes.func.isRequired,
};

class Filter extends Component {
  constructor(props) {
    super(props);

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleDayClick(day) {
    const isActive = this.props.activeDays.indexOf(day) > -1;

    if (isActive) {
      this.props.activeDays.splice(this.props.activeDays.indexOf(day), 1);
    } else {
      this.props.activeDays.push(day);
    }

    this.props.updateActiveDays(this.props.activeDays);
  }

  handleTimeChange(time) {
    this.props.updateActiveTime(time);
  }

  render() {
    const dayFilters = dayLabels.map((day, index) => {
      const isActive = this.props.activeDays.indexOf(index) > -1;

      return (
        <Day
          key={index}
          dayNumber={index}
          isActive={isActive}
          text={day}
          handleDayClick={this.handleDayClick}
        />
      );
    });

    return (
      <nav className="filters-wrapper">
        <div className="day-filter-wrapper">{dayFilters}</div>
        <TimeFilter
          activeTime={this.props.activeTime}
          timeValues={this.props.timeValues}
          handleTimeChange={this.handleTimeChange}
        />
      </nav>
    );
  }
}

Filter.propTypes = propTypes;

export default Filter;
