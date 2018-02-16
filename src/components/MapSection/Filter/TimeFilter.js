import React, { Component } from 'react';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.props.handleTimeChange(event.target.value);
  }
  render() { 
    let selectedTimeValue = "";
    let times =this.props.timeValues.map((time, index) => {
      if (this.props.activeTime.value === time.value) {
        selectedTimeValue = time.value;
      }
      return <option key={time.value} value={time.value}>{time.label}</option>
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

export default Filter;