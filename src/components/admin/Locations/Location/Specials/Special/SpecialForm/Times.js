import React, { Component } from 'react';
import AddTime from './AddTime';
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
            <AddTime handleSubmitNewTime={this.props.handleSubmitNewTime} />
          </div>
        </div>         
        {times}
      </div>           
    )
    
  }
}

export default Times;