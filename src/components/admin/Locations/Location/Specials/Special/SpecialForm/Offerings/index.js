import React, { Component } from 'react';
import Offering from './Offering';

export class Offerings extends Component {
  render() {
    let offerings = this.props.offerings.map((offering, index) => {
      return (
        <Offering key={index} index={index} offering={offering} deleteOffering={this.props.deleteOffering} />
      );
    });      
    return (
      <div className="form-element">
        <label className="font-title-sm form-label" htmlFor="description">offerings: </label> <button onClick={this.props.handleShowOfferingFormClick} className="button_sm button_dark">add offering</button>
        {offerings}  
      </div>
    );
  }
}

export default Offerings;