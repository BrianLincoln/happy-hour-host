import React, { Component } from 'react';
import Days from './Days';
import Times from './Times';
import './SpecialForm.scss';

export class AddSpecial extends Component {
  constructor(props) {
    super(props);

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.deleteTime = this.deleteTime.bind(this);
    this.handleSubmitNewTime = this.handleSubmitNewTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state =  {
      headline: this.props.headline ? this.props.headline : '',
      description: this.props.description ? this.props.description : '',
      days: this.props.days ? this.props.days : [],
      times: this.props.times ? this.props.times : [],
    }
  }   
  handleFieldChange(event) {
    switch (event.target.id) {
      case "headline":
        this.setState({headline: event.target.value});
        break;
      case "description":
        this.setState({description: event.target.value});
        break;
    }
  }
  handleDayChange(newDays) {
    this.setState({days: newDays});
  }
  handleSubmitNewTime(start, end) {
    let newTime = {
      start: start,
      end: end
    }
    let newTimes = this.state.times.slice();  
    newTimes.push(newTime);   
    this.setState({times: newTimes});
  }    
  deleteTime(index) {
    const newTimes = this.state.times.splice(index, 1);
    this.setState({times: newTimes});
  }     
  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmitSpecialForm(this.state);
  }

  render() {
    return (
      <div>
        <form className="special-form-wrapper space-top-sm space-bottom-sm" onSubmit={this.handleSubmit}>  
          <h2>New Special:</h2>
          <div className="form-element">
            <label className="font-title-sm form-label" htmlFor="headline">headline: </label>
            <input required type="text" id="headline" value={this.state.headline} onChange={this.handleFieldChange} />
          </div>                 
          <div className="form-element">
            <label className="font-title-sm form-label" htmlFor="description">description: </label>
            <input required type="text" id="description" value={this.state.description} onChange={this.handleFieldChange} />
          </div>             
          <Days handleDayChange={this.handleDayChange} days={this.state.days}/>   
          <Times handleSubmitNewTime={this.handleSubmitNewTime} deleteTime={this.deleteTime} times={this.state.times} />      
          <input className="button_sm button_scooter" type="submit" value="Submit" />
        </form>        
      </div>
    );
  }
}

export default AddSpecial;