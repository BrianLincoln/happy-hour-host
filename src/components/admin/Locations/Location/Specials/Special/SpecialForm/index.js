import React, { Component } from 'react';
import Offerings from './Offerings';
import AddOffering from './Offerings/AddOffering';
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

    //offerings
    this.handleShowOfferingFormClick = this.handleShowOfferingFormClick.bind(this);
    this.handleSubmitNewOffering = this.handleSubmitNewOffering.bind(this);
    this.handleCancelOfferingForm = this.handleCancelOfferingForm.bind(this);
    this.deleteOffering = this.deleteOffering.bind(this);

    this.handleCancelSpecialFormButtonClick = this.handleCancelSpecialFormButtonClick.bind(this);
    this.handleSubmitSpecialForm = this.handleSubmitSpecialForm.bind(this);
    this.validateForm = this.validateForm.bind(this);

    if (this.props.special) {
      this.state =  {
        headline: this.props.special.headline ? this.props.special.headline : '',
        days: this.props.special.days ? this.props.special.days : [],
        times: this.props.special.times ? this.props.special.times : [],
        offerings: this.props.special.offerings ? this.props.special.offerings : []
      }
    } else {
      this.state =  {
        headline: '',
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




  //Offerings
  handleShowOfferingFormClick(event) {
    event.preventDefault();
    this.setState({showOfferingForm: true});    
  }
  handleSubmitNewOffering(offering) {    
    let newOfferings = this.state.offerings.slice();  
    newOfferings.push(offering);   

    this.setState({showOfferingForm: false, offerings: newOfferings});
  }
  handleCancelOfferingForm(event) {
    event.preventDefault();
    this.setState({showOfferingForm: false});
  }
  deleteOffering(index) {
    const newOfferings = this.state.offerings;
    newOfferings.splice(index, 1);
    this.setState({offerings: newOfferings});
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

    if (this.state.showOfferingForm ) {
      formView = <AddOffering handleCancelOfferingForm={this.handleCancelOfferingForm} handleSubmitNewOffering={this.handleSubmitNewOffering} />;
    } else if (this.state.showAddTimeForm) {
      formView = <AddTime handleSubmitNewTime={this.handleSubmitNewTime} handleCancelTimeForm={this.handleCancelTimeForm} />
    } else {
      formView = (
        <div>
          <div className="form-element">
            <label className="font-title-sm form-label" htmlFor="headline">headline: </label>
            <input required type="text" id="headline" value={this.state.headline} onChange={this.handleFieldChange} />
          </div>      
          <Offerings handleShowOfferingFormClick={this.handleShowOfferingFormClick} handleSubmitNewOffering={this.handleSubmitNewOffering} deleteOffering={this.deleteOffering} offerings={this.state.offerings} />
          <Days handleDayChange={this.handleDayChange} days={this.state.days}/>   
          <Times handleShowTimeFormClick={this.handleShowTimeFormClick} deleteTime={this.deleteTime} times={this.state.times} />  
          {this.state.validationText ? <div className="validation-text">{this.state.validationText}</div> : null}
          <input className="button_sm button_scooter" type="submit" value="Submit" />
          <button className="button_sm button_valencia" onClick={this.handleCancelSpecialFormButtonClick}>cancel</button>                  
        </div>
      )
    }
    return (
      <form className="special-form-wrapper space-top-sm space-bottom-sm" onSubmit={this.handleSubmitSpecialForm}>          
        {formView}
      </form>
    );          
  }
}

export default SpecialForm;