import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  dayNumber: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  handleDayClick: PropTypes.func.isRequired,
};

class Day extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleDayClick(this.props.dayNumber);
  }

  render() {
    let classes = this.props.isActive ? 'button_valencia' : 'button_light';
    classes += ' button_sm day-filter';

    return (
      <button onClick={this.handleClick} className={classes}>
        {this.props.text}
      </button>
    );
  }
}

Day.propTypes = propTypes;

export default Day;
