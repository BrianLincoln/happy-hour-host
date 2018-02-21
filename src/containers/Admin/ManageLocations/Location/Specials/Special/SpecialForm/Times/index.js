import React, { Component } from 'react';
import Time from './Time';

export class Times extends Component {

  render() {
    let times = this.props.times.map((time, index) => {
      return (
        <Time key={index} index={index} time={time} deleteTime={this.props.deleteTime} />
      );
    });
    return (
      <div className="form-element">
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <label className="font-title-sm">Times:</label>
          </div>
          <div className="col-xs-12 col-sm-6">
            <button onClick={this.props.handleShowTimeFormClick} className="button_sm button_dark">+ add time</button>
          </div>
        </div>         
        {times.length > 0  ? times : "All Day"}
      </div>           
    )
  }
}

export default Times;