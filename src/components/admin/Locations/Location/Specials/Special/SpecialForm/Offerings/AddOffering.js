import React, { Component } from 'react';

export class AddOffering extends Component {
  constructor(props) {
    super(props);

    this.handleOfferingFieldChange = this.handleOfferingFieldChange.bind(this);
    this.handleSaveOffering = this.handleSaveOffering.bind(this);
    this.handleCancelNewOffering = this.handleCancelNewOffering.bind(this);

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
      description: this.state.description
    }
    
    this.props.handleSubmitNewOffering(offering);
    this.setState({
      showAddTimeForm: false
    })
  }
  handleCancelNewOffering(event) {
    event.preventDefault();
    this.props.handleCancelNewOffering();
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleAddTimeForm} className="button_sm button_dark">x hide</button>
        <div className="form-element">
          <input onChange={this.handleOfferingFieldChange} required id="description" type="text" />                    
        </div>           
        <button onClick={this.handleSaveOffering} className="button_sm button_scooter">save</button>
        <button onClick={this.handleCancelNewOffering} className="button_sm button_valencia">cancel</button>
      </div>
    );
  }
}

export default AddOffering;