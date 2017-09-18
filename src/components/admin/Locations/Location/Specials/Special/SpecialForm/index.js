import React, { Component } from 'react';
import Days from './Days';
import Times from './Times';
import './SpecialForm.scss';

export class SpecialForm extends Component {
  constructor(props) {
    super(props);

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.deleteTime = this.deleteTime.bind(this);
    this.handleSubmitNewTime = this.handleSubmitNewTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);

    if (this.props.special) {
      this.state =  {
        headline: this.props.special.headline ? this.props.special.headline : '',
        description: this.props.special.description ? this.props.special.description : '',
        days: this.props.special.days ? this.props.special.days : [],
        times: this.props.special.times ? this.props.special.times : [],
        offerings: this.props.special.offerings ? this.props.special.offerings : []
      }
    } else {
      this.state =  {
        headline: '',
        description: '',
        days: [],
        times: [],
        offerings: []
      }
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
    console.log("delete time: ", index);
    console.log("state times beforee: ", this.state.times);
    const newTimes = this.state.times;
    newTimes.splice(index, 1);
    console.log("state times: ", this.state.times, "\n -> \nnew times: ", newTimes);
    this.setState({times: newTimes});
  }     
  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmitSpecialForm(this.state);
  }  
  handleCancelButtonClick(event) {
    event.preventDefault();
    this.props.handleCancelSpecialForm();
  }

  render() {
    return (
      <div>
        <form className="special-form-wrapper space-top-sm space-bottom-sm" onSubmit={this.handleSubmit}>          
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
          <button className="button_sm button_valencia" onClick={this.handleCancelButtonClick}>cancel</button>
        </form>        
      </div>
    );
  }
}

export default SpecialForm;