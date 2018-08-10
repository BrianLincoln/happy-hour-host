import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Day from './Day';
import TimeFilter from './TimeFilter';
import dayLabels from '../../utils/DayLabels';
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
    const {
      activeDays, updateActiveDays,
    } = this.props;
    const isActive = activeDays.indexOf(day) > -1;

    if (isActive) {
      activeDays.splice(activeDays.indexOf(day), 1);
    } else {
      activeDays.push(day);
    }

    updateActiveDays(activeDays);
  }

  handleTimeChange(time) {
    const { updateActiveTime } = this.props;

    updateActiveTime(time);
  }

  render() {
    const {
      activeDays, activeTime, timeValues,
    } = this.props;
    const dayFilters = dayLabels.map((day, index) => {
      const isActive = activeDays.indexOf(index) > -1;

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
          activeTime={activeTime}
          timeValues={timeValues}
          handleTimeChange={this.handleTimeChange}
        />
      </nav>
    );
  }
}

Filter.propTypes = propTypes;

export default Filter;
