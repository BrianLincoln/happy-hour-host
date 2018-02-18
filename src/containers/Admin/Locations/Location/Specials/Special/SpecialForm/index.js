import React, { Component } from 'react';
import Days from './Days';
import Times from './Times';
import AddTime from './Times/AddTime';
import './SpecialForm.scss';

export class SpecialForm extends Component {
  constructor(props) {
    super(props);

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);

    //times
    this.handleShowTimeFormClick = this.handleShowTimeFormClick.bind(this);
    this.handleSubmitNewTime = this.handleSubmitNewTime.bind(this);
    this.handleCancelTimeForm = this.handleCancelTimeForm.bind(this);
    this.deleteTime = this.deleteTime.bind(this);

    this.handleCancelSpecialFormButtonClick = this.handleCancelSpecialFormButtonClick.bind(this);
    this.handleSubmitSpecialForm = this.handleSubmitSpecialForm.bind(this);
    this.validateForm = this.validateForm.bind(this);

    if (this.props.special) {
      this.state =  {
        headline: this.props.special.headline ? this.props.special.headline : '',
        days: this.props.special.days ? this.props.special.days : [],
        times: this.props.special.times ? this.props.special.times : [],
        details: this.props.special.details ? this.props.special.details : '',
        hasDrinkSpecial: this.props.special.hasDrinkSpecial ? this.props.special.hasDrinkSpecial : false,
        hasFoodSpecial: this.props.special.hasFoodSpecial ? this.props.special.hasFoodSpecial : false
      }
    } else {
      this.state =  {
        headline: '',
        days: [],
        times: [],
        details: '',
        hasDrinkSpecial: false,
        hasFoodSpecial: false
      }
    }
  }   
  handleFieldChange(event) {
    switch (event.target.id) {
      case "headline":
        this.setState({headline: event.target.value});
        break;
      case "details":
        this.setState({details: event.target.value});
        break;
      case "hasDrinkSpecial":
        this.setState({hasDrinkSpecial: !this.state.hasDrinkSpecial});        
        break;
      case "hasFoodSpecial":
        this.setState({hasFoodSpecial: !this.state.hasFoodSpecial});
        break;
    }
  }

  handleDayChange(newDays) {
    this.setState({days: newDays});
  }

  //Times
  handleShowTimeFormClick(event) {
    event.preventDefault();
    this.setState({showAddTimeForm: true});
  }   
  handleSubmitNewTime(start, end) {
    let newTime = {
      start: start,
      end: end,
      pending: true
    }
    let newTimes = this.state.times.slice();  
    newTimes.push(newTime);   
    this.setState({times: newTimes, showAddTimeForm: false});
  }    
  handleCancelTimeForm(event) {
    event.preventDefault();
    this.setState({showAddTimeForm: false});
  }  
  deleteTime(index) {
    const newTimes = this.state.times;
    newTimes.splice(index, 1);
    this.setState({times: newTimes});
  }     

  handleCancelSpecialFormButtonClick(event) {
    event.preventDefault();
    this.props.handleCancelSpecialForm();
  }
  handleSubmitSpecialForm(event) {
    event.preventDefault();
    const validationText = this.validateForm();

    if (validationText.length > 0) {
      this.setState({validationText: validationText});
    } else {
      this.props.handleSubmitSpecialForm(this.state);
    }
  }  
  validateForm() {
    let result = "";

    if (this.state.days.length < 1) {
      result = "No Days Seleted";
    }

    return result;
  }

  render() {
    let formView = null;

    if (this.state.showAddTimeForm) {
      formView = <AddTime handleSubmitNewTime={this.handleSubmitNewTime} handleCancelTimeForm={this.handleCancelTimeForm} />
    } else {
      formView = (
        <div>
          <div className="form-element">
            <label className="form-label" htmlFor="headline">headline: </label>
            <input required type="text" id="headline" value={this.state.headline} onChange={this.handleFieldChange} />
          </div>      
          <div className="form-element">
            <label className="form-label" htmlFor="details">details: </label>
            <input required type="text" id="details" value={this.state.details} onChange={this.handleFieldChange} />
          </div> 
          <div className="form-element">
            <label className="form-label" htmlFor="hasDrinkSpecial">drink special: </label>
            <input type="checkbox" id="hasDrinkSpecial" checked={this.state.hasDrinkSpecial} onChange={this.handleFieldChange} />
          </div>     
          <div className="form-element">
            <label className="form-label" htmlFor="hasFoodSpecial">food special: </label>
            <input type="checkbox" id="hasFoodSpecial" checked={this.state.hasFoodSpecial} onChange={this.handleFieldChange} />
          </div>             
          <Days handleDayChange={this.handleDayChange} days={this.state.days}/>   
          <Times handleShowTimeFormClick={this.handleShowTimeFormClick} deleteTime={this.deleteTime} times={this.state.times} />  
          {this.state.validationText ? <div className="validation-text">{this.state.validationText}</div> : null}
          <input className="button_sm button_scooter" type="submit" value="Submit" />
          <button className="button_sm button_valencia" onClick={this.handleCancelSpecialFormButtonClick}>cancel</button>                  
        </div>
      )
    }
    return (
      <form className="special-form-wrapper form-group space-top-sm space-bottom-sm" onSubmit={this.handleSubmitSpecialForm}>          
        {formView}
      </form>
    );          
  }
}

export default SpecialForm;