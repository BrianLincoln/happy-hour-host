import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Specials from './Specials/Specials';
import LocationForm from './LocationForm/LocationForm';
import locationApi from '../../utils/LocationApi';

const propTypes = {
  cityId: PropTypes.string.isRequired,
  locationId: PropTypes.string.isRequired,
};

export class LocationDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.fetchLocation = this.fetchLocation.bind(this);
    this.handleSaveEditLocationForm = this.handleSaveEditLocationForm.bind(this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.handleCancelEditLocation = this.handleCancelEditLocation.bind(this);

    this.fetchLocation();
  }

  fetchLocation() {
    const { locationId } = this.props;

    locationApi.getLocation(locationId).then((result) => {
      if (result.success) {
        this.setState({
          location: result.location,
        });
      }
    });
  }

  handleSaveEditLocationForm(location) {
    locationApi.updateLocation(location).then(() => {
      this.setState({
        showEditLocationForm: false,
      });
      this.fetchLocation();
    });
  }

  handleEditButtonClick() {
    this.setState({
      showEditLocationForm: true,
    });
  }

  handleCancelEditLocation() {
    this.setState({
      showEditLocationForm: false,
    });
  }

  render() {
    const {
      location, showEditLocationForm,
    } = this.state;
    const {
      cityId, locationId,
    } = this.props;

    if (!location) {
      return <div className="spinner" />;
    }

    if (showEditLocationForm) {
      return (
        <div className="container space-top-xl space-bottom-xl">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4">
              <LocationForm
                cityId={cityId}
                mode="update"
                {...this.state}
                handleCancel={this.handleCancelEditLocation}
                handleSubmitUpdateLocation={this.handleSaveEditLocationForm}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container space-top-xl space-bottom-xl">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="card col-xs-12">
              <a
                className="button_sm .button_transparent"
                href={`/admin/city/${cityId}`}
              >
                <i className="fas fa-arrow-left" /> back
              </a>
              <h1>{location.name}</h1>
              <div>
                {location.position.latitude}, {location.position.longitude}
              </div>
              {location.website ? (
                <div>
                  <a href={location.website}>{location.website}</a>
                </div>
              ) : null}
              {location.googleMapLink ? (
                <div>
                  <a href={location.googleMapLink}>google map</a>
                </div>
              ) : null}
              <div className="button-group button-group_left">
                <button
                  type="button"
                  onClick={this.handleEditButtonClick}
                  className="button_sm button_curious"
                >
                  edit
                </button>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="card col-xs-12">
              <h3 className="card-heading">Specials</h3>
              <Specials
                locationId={locationId}
                specials={location.specials}
                fetchLocation={this.fetchLocation}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LocationDetails.propTypes = propTypes;

export default LocationDetails;
