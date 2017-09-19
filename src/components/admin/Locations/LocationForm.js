import React, { Component } from 'react';
import './AddLocation.scss';

export class LocationForm extends Component {
  constructor(props) {
    super(props);

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);

      console.log(this.props);
    if (this.props.mode === "update") {
      this.state =  {
        _id: this.props.location._id,
        name: this.props.location.name ? this.props.location.name : '',
        positionLatitude: this.props.location.position.latitude ? this.props.location.position.latitude : '',
        positionLongitude: this.props.location.position.longitude ? this.props.location.position.longitude : '',
        addressStreet: this.props.location.address.streetAddress ? this.props.location.address.streetAddress : '',
        addressCity: this.props.location.address.city ? this.props.location.address.city : '',
        addressState: this.props.location.address.state ? this.props.location.address.state : '',
        addressZip: this.props.location.address.zip ? this.props.location.address.zip : '',
        neighborhoods: this.props.location.neighborhoods ? this.props.location.neighborhoods : [],
        website: this.props.location.website ? this.props.location.website : '',
        googleMapLink: this.props.location.googleMapLink ? this.props.location.googleMapLink : ''
      }
    } else {
      this.state = {
        name: '',
        positionLatitude: '',
        positionLongitude: '',
        addressStreet: '',
        addressCity: '',
        addressState: '',
        addressZip: '',
        neighborhoods: [],
        specials: [],
        website: '',
        googleMapLink: ''
      }
    }

  } 
  handleFieldChange(event) {
    switch (event.target.id) {
      case "location-name":
        this.setState({name: event.target.value});
        break;
      case "latitude":
        this.setState({positionLatitude: event.target.value});
        break;
      case "longitude":
        this.setState({positionLongitude: event.target.value});
        break;
      case "street-address":
        this.setState({addressStreet: event.target.value});
        break;
      case "address-city":
        this.setState({addressCity: event.target.value});
        break;
      case "address-state":
        this.setState({addressState: event.target.value});
        break;
      case "address-zip":
        this.setState({addressZip: event.target.value});
        break;
      case "website":
        this.setState({website: event.target.value});
        break;
      case "googleMapLink":
        this.setState({googleMapLink: event.target.value});
        break;  
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("state at submit: ", this.state);
    if (this.props.mode === "new") {
      this.props.handleSubmitNewLocation(this.state);
    } else if (this.props.mode === "update") {
      this.props.handleSubmitUpdateLocation(this.state);
    }
  }
  handleCancelButtonClick(event) {
    event.preventDefault();
    this.props.handleCancel();
  }
  render() {
    return (
      <div className="add-location-wrapper">
        <form className="space-top-sm space-bottom-sm" onSubmit={this.handleSubmit}>  

          <div className="form-element">
            <label className="font-title-sm form-label" htmlFor="location-name">name: </label>
            <input required type="text" id="location-name" value={this.state.name} onChange={this.handleFieldChange} />
          </div>
          <div className="form-element">
            <label className="font-title-sm form-label" htmlFor="latitude">latitude: </label>
            <input required type="text" id="latitude" value={this.state.positionLatitude} onChange={this.handleFieldChange} />
          </div>
          <div className="form-element">               
            <label className="font-title-sm form-label" htmlFor="longitude">longitude: </label>
            <input required type="text" id="longitude" value={this.state.positionLongitude} onChange={this.handleFieldChange} />
          </div>
          <div className="form-element">            
            <label className="font-title-sm form-label" htmlFor="street-address">street address: </label>
            <input required type="text" id="street-address" value={this.state.addressStreet} onChange={this.handleFieldChange} />
          </div>
          <div className="form-element">
            <label className="font-title-sm form-label" htmlFor="address-city">city: </label>
            <input required type="text" id="address-city" value={this.state.addressCity} onChange={this.handleFieldChange} />
          </div>
          <div className="form-element">
            <label className="font-title-sm form-label" htmlFor="address-state">state: </label>
            <input required type="text" id="address-state" value={this.state.addressState} onChange={this.handleFieldChange} />
          </div>
          <div className="form-element">              
            <label className="font-title-sm form-label" htmlFor="address-zip">zip: </label>
            <input required type="text" id="address-zip" value={this.state.addressZip} onChange={this.handleFieldChange} />
          </div>  
          <div className="form-element">              
            <label className="font-title-sm form-label" htmlFor="website">website: </label>
            <input required type="text" id="website" value={this.state.website} onChange={this.handleFieldChange} />
          </div>  
          <div className="form-element">              
            <label className="font-title-sm form-label" htmlFor="googleMapLink">googleMapLink: </label>
            <input required type="text" id="googleMapLink" value={this.state.googleMapLink} onChange={this.handleFieldChange} />
          </div>                                                                       

          <div className="button-group">
            <input className="button_sm button_scooter" type="submit" value="Submit" />
            <button className="button_sm button_valencia" onClick={this.handleCancelButtonClick} >cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default LocationForm;