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
    const { handleTimeChange } = this.props;

    handleTimeChange(event.target.value);
  }

  render() {
    const {
      timeValues, activeTime,
    } = this.props;
    let selectedTimeValue = '';

    const times = timeValues.map((time) => {
      if (activeTime.value === time.value) {
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
