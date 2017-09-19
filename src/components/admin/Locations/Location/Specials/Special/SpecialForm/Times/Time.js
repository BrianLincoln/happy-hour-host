import React, { Component } from 'react';

export class Time extends Component {
  constructor(props) {
    super(props);

    this.handleDeleteTimeClick = this.handleDeleteTimeClick.bind(this);
  }

  handleDeleteTimeClick(event) {
    event.preventDefault();

    this.props.deleteTime(this.props.index);
  }  
  render() {
    return (
      <div>
        {this.props.time.start} - {this.props.time.end} <a className="color-valencia" onClick={this.handleDeleteTimeClick}>delete</a>
      </div>
    );
  }
}

export default Time;