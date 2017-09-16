import React, { Component } from 'react';
import Specials from './Specials';
import LocationForm from './../LocationForm';

export class LocationDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.handleCancelEditLocation = this.handleCancelEditLocation.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
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
    console.log("props: ", this.props);
    if (this.state.showEditLocationForm) {
      return <LocationForm mode="update" {...this.props} handleCancel={this.handleCancelEditLocation} />
    } else  {
      return (
        <div>
          <h1>{this.props.name}</h1>
          <button onClick={this.handleEditButtonClick} className="button_sm button_valencia">edit</button>
          <button onClick={this.props.unselectLocation} className="button_sm button_scooter">back</button>
          <div className="location-details-address">
            <div>{this.props.address.streetAddress}</div>
            <div>{this.props.address.city}, {this.props.address.state} {this.props.address.zip}</div>
          </div>
          <div>{this.props.position.latitude}, {this.props.position.longitude}</div>
          <Specials locationId={this.props._id} specials={this.props.specials}  updateLocations={this.props.updateLocations} />
          <button onClick={this.handleDeleteButtonClick} className="button_sm button_scooter">delete</button>
        </div>
      )
    }
  }
}

export default LocationDetails;