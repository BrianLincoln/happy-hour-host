import React, { Component } from 'react';
import Specials from './Specials';
import LocationForm from './../LocationForm';

export class LocationDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.handleSaveEditLocationForm = this.handleSaveEditLocationForm.bind(this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.handleCancelEditLocation = this.handleCancelEditLocation.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
  }    

  handleSaveEditLocationForm(locationId, location) {
    this.props.updateLocation(locationId, location);
    this.setState({showEditLocationForm: false});
  }
  handleEditButtonClick() {
    this.setState({showEditLocationForm: true});
  }
  handleCancelEditLocation() {
    this.setState({showEditLocationForm: false});
  }
  handleDeleteButtonClick() {
    this.props.deleteLocation(this.props._id)
  }

  render() {
    if (this.state.showEditLocationForm) {
      return <LocationForm mode="update" {...this.props} handleCancel={this.handleCancelEditLocation} handleSubmitUpdateLocation={this.handleSaveEditLocationForm} />
    } else  {
      return (
        <div>
          <h1>{this.props.location.name}</h1>
          <div className="location-details-address">
            <div>{this.props.location.address.streetAddress}</div>
            <div>{this.props.location.address.city}, {this.props.location.address.state} {this.props.location.address.zip}</div>
          </div>
          <div>{this.props.location.position.latitude}, {this.props.location.position.longitude}</div>
          <div>
            <button onClick={this.handleEditButtonClick} className="button_sm button_valencia">edit</button>
            <button onClick={this.props.unselectLocation} className="button_sm button_scooter">back</button>
          </div>

          <Specials locationId={this.props.location._id} specials={this.props.location.specials}  fetchLocations={this.props.fetchLocations} />
          <button onClick={this.handleDeleteButtonClick} className="button_sm button_scooter">delete location</button>
        </div>
      )
    }
  }
}

export default LocationDetails;