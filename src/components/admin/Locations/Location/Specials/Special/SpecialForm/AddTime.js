import React, { Component } from 'react';

export class AddTime extends Component {
  constructor(props) {
    super(props);

    this.toggleAddTimeForm = this.toggleAddTimeForm.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state =  {
      showAddTimeForm: false,
      time: {
        start: null,
        end: null
      }
    }
  }    
  toggleAddTimeForm() {
    this.setState({showAddTimeForm: !this.state.showAddTimeForm});
  }
  handleTimeChange(event) {
    let newTime = this.state.time
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
    this.props.handleSubmitNewTime(this.state.time.start, this.state.time.end);
    this.setState({
      showAddTimeForm: false
    })
  }

  render() {
    if (this.state.showAddTimeForm) {
      return (
        <div>
          <button onClick={this.toggleAddTimeForm} className="button_sm button_dark">x hide</button>
          <div className="form-element">
            <label className="form-label" htmlFor="start-time">start time</label>
            <input onChange={this.handleTimeChange} required id="start-time" type="time" />                    
          </div>
          <div className="form-element">
            <label className="form-label" htmlFor="end-time">end time</label>
            <input onChange={this.handleTimeChange} required id="end-time" type="time" />                  
          </div>            
          <button onClick={this.handleSubmit} className="button_sm button_scooter">save</button>
        </div>
      );
    } else {
      return <button onClick={this.toggleAddTimeForm} className="button_sm button_dark">+ add time</button>
    }
  }
}

export default AddTime;