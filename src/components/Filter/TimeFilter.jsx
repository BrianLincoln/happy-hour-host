import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  activeTime: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  handleTimeChange: PropTypes.func.isRequired,
  timeValues: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
  })).isRequired,
};

class TimeFilter extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.handleTimeChange(event.target.value);
  }

  render() {
    let selectedTimeValue = '';
    const times = this.props.timeValues.map((time) => {
      if (this.props.activeTime.value === time.value) {
        selectedTimeValue = time.value;
      }

      return (
        <option key={time.value} value={time.value}>
          {time.label}
        </option>
      );
    });

    return (
      <div className="time-filter-wrapper">
        <select onChange={this.handleChange} value={selectedTimeValue}>
          {times}
        </select>
      </div>
    );
  }
}

TimeFilter.propTypes = propTypes;

export default TimeFilter;
