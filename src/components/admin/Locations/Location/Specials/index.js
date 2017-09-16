import React, { Component } from 'react';
import AddSpecial from './Special/SpecialForm';
import Special from './Special';
import locationApi from './../../../../../utils/LocationApi';

export class Specials extends Component {
  constructor(props) {
    super(props);

    this.state = {      
      showAddSpecialForm: false
    }

    this.handleSubmitNewSpecial = this.handleSubmitNewSpecial.bind(this);
    this.deleteSpecial = this.deleteSpecial.bind(this);
    this.toggleAddSpecialForm = this.toggleAddSpecialForm.bind(this);
  }  

  handleSubmitNewSpecial(special) {
    locationApi.postSpecial(special, this.props.locationId).then((locations) => {
      this.props.fetchLocations();
    });
  }

  deleteSpecial(specialId) {
    locationApi.deleteSpecial(this.props.locationId, specialId).then((locations) => {
      this.props.fetchLocations();
    });
  }
  toggleAddSpecialForm() {
    this.setState({showAddSpecialForm: !this.state.showAddSpecialForm});
  }  
  render() {
    const toggleAddSpecial = this.state.showAddSpecialForm 
      ? <button onClick={this.toggleAddSpecialForm} className="button_sm button_dark admin-add-location-action">x hide</button>
      : <button onClick={this.toggleAddSpecialForm} className="button_sm button_dark admin-add-location-action">+ add special</button>;

    const specials = this.props.specials.map((special, index) => {
      return (
        <Special key={special._id} {...special} locationId={this.props.locationId} deleteSpecial={this.deleteSpecial} fetchLocations={this.props.fetchLocations} />
      );
    });    
    return (
      <div className="row">
        <div className="col-xs-12 col-md-6">
          {specials}
        </div>
        <div className="col-xs-12 col-md-6">
          {toggleAddSpecial}
          {this.state.showAddSpecialForm ? <AddSpecial handleSubmitSpecialForm={this.handleSubmitNewSpecial} /> : null}
        </div>
      </div>
    );
  }
}

export default Specials;