import React, { Component } from 'react';
import AddOffering from './AddOffering';
import Offering from './Offering';

export class Offerings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offerings: this.props.offerings ? this.props.offerings : [],
      showOfferingForm: false
    }

    this.handleShowOfferingFormClick = this.handleShowOfferingFormClick.bind(this);
    this.handleSubmitNewOffering = this.handleSubmitNewOffering.bind(this);
    this.handleCancelNewOffering = this.handleCancelNewOffering.bind(this);
  }

  handleShowOfferingFormClick(event) {
    event.preventDefault();
    this.setState({showOfferingForm: true});
  }
  handleSubmitNewOffering(offering) {
    this.setState({showOfferingForm: false}, this.props.handleSubmitNewOffering(offering));    
  }
  handleCancelNewOffering() {
    this.setState({showOfferingForm: false});
  }
  render() {
    if (this.state.showOfferingForm) {
      return <AddOffering handleCancelNewOffering={this.handleCancelNewOffering} handleSubmitNewOffering={this.handleSubmitNewOffering} />
    } else {
      let offerings = this.props.offerings.map((offering, index) => {
        return (
          <Offering key={index} index={index} offering={offering} deleteOffering={this.props.deleteOffering} />
        );
      });      
      return (
        <div className="form-element">
          <label className="font-title-sm form-label" htmlFor="description">offerings: </label> <button onClick={this.handleShowOfferingFormClick} className="button_sm button_dark">add offering</button>
          {offerings}  
        </div>
      );
    }
  }
}

export default Offerings;