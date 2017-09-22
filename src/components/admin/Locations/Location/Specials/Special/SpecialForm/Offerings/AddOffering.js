import React, { Component } from 'react';

export class AddOffering extends Component {
  constructor(props) {
    super(props);

    this.handleOfferingFieldChange = this.handleOfferingFieldChange.bind(this);
    this.handleSaveOffering = this.handleSaveOffering.bind(this);

    this.state =  {
      description: ""
    }
  }
  handleOfferingFieldChange(event) {
    this.setState({description: event.target.value});
  }
  handleSaveOffering(event) {
    event.preventDefault();
    const offering = {
      description: this.state.description,
      pending: true
    }
    
    this.props.handleSubmitNewOffering(offering);
    this.setState({
      showAddTimeForm: false
    });
  }

  render() {
    return (
      <div>
        <h2>Add Offering</h2>
        <div className="form-element">
          <input onChange={this.handleOfferingFieldChange} required id="description" type="text" />                    
        </div>           
        <button onClick={this.handleSaveOffering} className="button_sm button_scooter">save</button>
        <button onClick={this.props.handleCancelOfferingForm} className="button_sm button_valencia">cancel</button>
      </div>
    );
  }
}

export default AddOffering;