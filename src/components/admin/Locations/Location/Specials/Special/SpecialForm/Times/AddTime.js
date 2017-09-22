import React, { Component } from 'react';

export class AddTime extends Component {
  constructor(props) {
    super(props);

    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);

    this.state =  {
      time: {}
    }
  } 
  handleTimeChange(event) {
    let newTime = this.state.time ? this.state.time : {};
    
    switch(event.target.id) {
      case "start-time":
        newTime.start = event.target.value;
        break;
      case "end-time":
        newTime.end = event.target.value;
        break;
    }
    this.setState({time: newTime});
  }
  handleSubmit(event) {
    event.preventDefault();
    const validationText = this.validateForm();

    if (validationText.length > 0) {
      this.setState({validationText: validationText});
    } else {
      this.props.handleSubmitNewTime(this.state.time.start, this.state.time.end);
    }
  }
  validateForm() {
    let result = "";

    if (!this.state.time.start || !this.state.time.end) {
      result = "Missing Time";
    }

    return result;
  }

  render() {
    console.log("add time state: ",  this.state);
    return (
      <div>
        <h2>Add Time</h2>
        <div className="form-element">
          <label className="form-label" htmlFor="start-time">start time</label>
          <input onChange={this.handleTimeChange} required id="start-time" type="time" />                    
        </div>
        <div className="form-element">
          <label className="form-label" htmlFor="end-time">end time</label>
          <input onChange={this.handleTimeChange} required id="end-time" type="time" />                  
        </div>           
        {this.state.validationText ? <div className="validation-text">{this.state.validationText}</div> : null} 
        <button onClick={this.handleSubmit} className="button_sm button_scooter">save</button>
        <button onClick={this.props.handleCancelTimeForm} className="button_sm button_dark">cancel</button>
      </div>
    );
  }
}

export default AddTime;