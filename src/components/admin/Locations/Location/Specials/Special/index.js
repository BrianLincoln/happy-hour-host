import React, { Component } from 'react';
import SpecialForm from './SpecialForm';
import locationApi from './../../../../../../utils/LocationApi';

export class Special extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditSpecialForm: false
    }

    this.toggleEditSpecial = this.toggleEditSpecial.bind(this);
    this.deleteSpecial = this.deleteSpecial.bind(this);
    this.handleSubmitEditSpecialForm = this.handleSubmitEditSpecialForm.bind(this);
  }  

  toggleEditSpecial(event) {
    this.setState({showEditSpecialForm: !this.state.showEditSpecialForm});
  }

  deleteSpecial(event) {
    event.preventDefault();
    this.props.deleteSpecial(this.props._id);
  }
  
  handleSubmitEditSpecialForm(special) {
    locationApi.updateSpecial(special, this.props.locationId, this.props._id).then((locations) => {
      this.props.updateLocations();      
      this.setState({showEditSpecialForm: !this.state.showEditSpecialForm});
    });    
  }
  render() {

    const toggleEditSpecial = this.state.showEditSpecialForm 
      ? <button onClick={this.toggleEditSpecial} className="button_sm button_dark admin-add-location-action">x hide</button>
      : <button onClick={this.toggleEditSpecial} className="button_sm button_dark admin-add-location-action">+ edit</button>;

    return (
      <div className="card">
        <div className="list-group">
          <div className="list-item">
            <div className="font-title-sm">{this.props.headline}</div>
          </div>
          <div className="list-item">{this.props.description}</div>  
          <div className="list-item">
            {toggleEditSpecial} 
            {this.state.showEditSpecialForm ? <SpecialForm handleSubmitSpecialForm={this.handleSubmitEditSpecialForm} {...this.props} /> : null} 
          </div> 
          <div className="list-item"><button onClick={this.deleteSpecial}>delete</button></div>            
        </div>
      </div>
    );
    
  }
}

export default Special;