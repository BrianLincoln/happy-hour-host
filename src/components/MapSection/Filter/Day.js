import React, { Component } from 'react';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.handleDayClick(this.props.dayNumber);
  }
  render() { 
    let classes = this.props.isActive ? "button_valencia" : "button_light";
    classes += " button_sm special-day-header";

    return (
      <label onClick={this.handleClick} className={classes} >{this.props.text}</label>
    );
  }
}

export default Filter;