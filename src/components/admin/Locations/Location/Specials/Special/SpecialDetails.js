import React, { Component } from 'react';
import SpecialForm from './SpecialForm';
import dayLabels from './../../../../../../utils/DayLabels';
import timeConverter from './../../../../../../utils/TimeConverter';

export class SpecialDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditSpecialForm: false
    }

    this.toggleEditSpecial = this.toggleEditSpecial.bind(this);
    this.deleteSpecial = this.deleteSpecial.bind(this);
    this.deselectSpecial = this.deselectSpecial.bind(this);
    this.handleSubmitEditSpecialForm = this.handleSubmitEditSpecialForm.bind(this);
    this.handleCancelSpecialForm = this.handleCancelSpecialForm.bind(this);
  }  

  toggleEditSpecial(event) {
    this.setState({showEditSpecialForm: !this.state.showEditSpecialForm});
  }
  deleteSpecial(event) {
    event.preventDefault();
    this.props.deleteSpecial(this.props.special._id);
  }
  deselectSpecial(event) {
    event.preventDefault();
    this.props.deselectSpecial();
  }
  handleSubmitEditSpecialForm(special) {
    this.props.handleSubmitEditSpecialForm(special, this.props.special._id);
  }
  handleCancelSpecialForm() {
    this.setState({showEditSpecialForm: false}, this.props.cancelEditSpecial());
  }
  render() {
    if (this.state.showEditSpecialForm) {
      return <SpecialForm handleSubmitSpecialForm={this.handleSubmitEditSpecialForm} handleCancelSpecialForm={this.handleCancelSpecialForm} special={this.props.special} />;
    } else {
      const days = this.props.special.days ? this.props.special.days.map((day, index) => {      
        const isLast = index + 1 === this.props.special.days.length;
        const labelText = isLast ? dayLabels[day] : dayLabels[day] + ", ";
  
        return <label className="font-base-alt" key={day}>{labelText}</label>;
      }) : "none (won't show on site)";

      const times = this.props.special.times && this.props.special.times.length > 0 
        ? this.props.special.times.map((time) => {
            const startTime = timeConverter(time.start);
            const endTime = timeConverter(time.end);
  
            return <div className="font-base-alt" key={time._id}>{startTime} - {endTime}</div>;
          }) 
        : "All Day"; 
      const offerings = "Offerings";

      return (
        <div className="card">
          <div className="list-group">
            <div className="list-item">
              <div className="font-title-sm">{this.props.special.headline}</div>
              <p>{this.props.special.description}</p>
            </div>
            <div className="list-item">{days}</div>
            <div className="list-item">{times}</div>
            <div className="list-item">{offerings}</div>
            
            <div className="list-item">
              <button onClick={this.toggleEditSpecial} className="button_sm button_valencia">+ edit</button>            
              <button onClick={this.deselectSpecial} className="button_sm button_dark">back</button>
            </div> 
            <div className="list-item"><button onClick={this.deleteSpecial}>delete special</button></div>            
          </div>
        </div>
      );
    }
  }
}

export default SpecialDetails;