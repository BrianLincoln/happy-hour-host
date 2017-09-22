import React, { Component } from 'react';
import './Time.scss';

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
      <div className="row admin-time">
        <div className="col-xs-6">{this.props.time.start} - {this.props.time.end}</div>
        <div className="col-xs-3">{this.props.time.pending ? <div className="font-sm">*pending save</div> : null}</div>
        <div className="col-xs-3"><a className="button_sm button_valencia" onClick={this.handleDeleteTimeClick}>x</a></div>        
      </div>      
    );
  }
}

export default Time;