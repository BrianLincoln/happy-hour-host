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
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <h1>{this.props.location.name}</h1>
            <div>{this.props.location.position.latitude}, {this.props.location.position.longitude}</div>
            {this.props.location.website ? <div><a href={this.props.location.website}>{this.props.location.website}</a></div> : null}
            {this.props.location.googleMapLink ? <div><a href={this.props.location.googleMapLink}>google map</a></div> : null}
            <div className="button-group button-group_left">
              <button onClick={this.handleEditButtonClick} className="button_sm button_curious">edit</button>
              <button onClick={this.props.unselectLocation} className="button_sm button_light">back</button>
            </div>
          </div>          
          <div className="col-xs-12 col-md-6">
            <Specials locationId={this.props.location._id} specials={this.props.location.specials} fetchLocations={this.props.fetchLocations} />
          </div>
          <div className="col-xs-12">
            <button onClick={this.handleDeleteButtonClick} className="button_sm button_valencia">delete location</button>
          </div>
        </div>
      )
    }
  }
}

export default LocationDetails;