import React, { Component } from 'react';
import LocationForm from './../../Location/LocationForm';

export class AddLocation extends Component {
  constructor(props) {
    super(props);

    this.toggleAddLocationForm = this.toggleAddLocationForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state =  {
      showAddLocationForm: false
    }
  }    
  
  toggleAddLocationForm() {
    this.setState({showAddLocationForm: !this.state.showAddLocationForm});
  }

  handleSubmit(location) {
    this.props.postLocation(location);
    this.toggleAddLocationForm();
  }

  render() {
    if (this.state.showAddLocationForm) {
      return (
        <div>
          <button onClick={this.toggleAddLocationForm} className="button_sm button_dark">x hide</button>
          <LocationForm mode="new" handleCancel={this.toggleAddLocationForm} handleSubmitNewLocation={this.handleSubmit} />
        </div>
      )
    } else {
      return (
        <button onClick={this.toggleAddLocationForm} className="button_sm button_dark">+ add location</button>
      )      
    }
  }
}

export default AddLocation;