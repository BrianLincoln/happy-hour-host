import React, { Component } from 'react';
import Specials from './Specials';
import LocationForm from './../LocationForm';
import locationApi from './../../../../utils/LocationApi';

export class LocationDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.fetchLocation = this.fetchLocation.bind(this);
    this.handleSaveEditLocationForm = this.handleSaveEditLocationForm.bind(this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.handleCancelEditLocation = this.handleCancelEditLocation.bind(this);

    this.fetchLocation();
  }    
  fetchLocation() {
    locationApi.getLocation(this.props.locationId).then((result) => {      
      if (result.success) {
        this.setState({location: result.location});
      }
    });
  } 
  handleSaveEditLocationForm(location) {
    locationApi.updateLocation(location).then((results) => {
      this.setState({showEditLocationForm: false});
      this.fetchLocation(this.props.locationId);
    });  
  }
  handleEditButtonClick() {
    this.setState({showEditLocationForm: true});
  }
  handleCancelEditLocation() {
    this.setState({showEditLocationForm: false});
  }
  render() {
    if (!this.state.location) {
      return <div className="spinner"></div>
    } else  {
        
      if (this.state.showEditLocationForm) {
        return <LocationForm mode="update" {...this.state} handleCancel={this.handleCancelEditLocation} handleSubmitUpdateLocation={this.handleSaveEditLocationForm} />
      } else  {
        return (
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <a className="button_sm .button_transparent" href="/admin/manage-locations"><i className="fas fa-arrow-left"></i> back</a>
              <h1>{this.state.location.name}</h1>
              <div>{this.state.location.position.latitude}, {this.state.location.position.longitude}</div>
              {this.state.location.website ? <div><a href={this.state.location.website}>{this.state.location.website}</a></div> : null}
              {this.state.location.googleMapLink ? <div><a href={this.state.location.googleMapLink}>google map</a></div> : null}
              <div className="button-group button-group_left">
                <button onClick={this.handleEditButtonClick} className="button_sm button_curious">edit</button>
              </div>
            </div>          
            <div className="col-xs-12 col-md-6">
              <Specials locationId={this.props.locationId} specials={this.state.location.specials} fetchLocation={this.fetchLocation} />
            </div>
          </div>
        )
      }
    }
  }
}

export default LocationDetails;