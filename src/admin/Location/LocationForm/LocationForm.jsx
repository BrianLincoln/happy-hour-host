import React, { Component } from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
  location: null,
  handleSubmitUpdateLocation: undefined,
  handleSubmitNewLocation: undefined,
};

const propTypes = {
  mode: PropTypes.string.isRequired,
  cityId: PropTypes.string.isRequired,
  location: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
    neighborhoods: PropTypes.array,
    website: PropTypes.string,
    googleMapLink: PropTypes.string,
  }),
  handleSubmitNewLocation: PropTypes.func,
  handleSubmitUpdateLocation: PropTypes.func,
  handleCancel: PropTypes.func.isRequired,
};

export class LocationForm extends Component {
  constructor(props) {
    super(props);

    const {
      mode, location, cityId,
    } = this.props;

    if (mode === 'update') {
      this.state = {
        _id: location._id,
        city: cityId,
        name: location.name ? location.name : '',
        positionLatitude: location.position.latitude
          ? location.position.latitude
          : '',
        positionLongitude: location.position.longitude
          ? location.position.longitude
          : '',
        neighborhoods: location.neighborhoods ? location.neighborhoods : [],
        website: location.website ? location.website : '',
        googleMapLink: location.googleMapLink ? location.googleMapLink : '',
      };
    } else {
      this.state = {
        city: cityId,
        name: '',
        positionLatitude: '',
        positionLongitude: '',
        neighborhoods: [],
        specials: [],
        website: '',
        googleMapLink: '',
      };
    }

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
  }

  handleFieldChange(event) {
    switch (event.target.id) {
      case 'location-name':
        this.setState({
          name: event.target.value,
        });
        break;
      case 'latitude':
        this.setState({
          positionLatitude: event.target.value,
        });
        break;
      case 'longitude':
        this.setState({
          positionLongitude: event.target.value,
        });
        break;
      case 'website':
        this.setState({
          website: event.target.value,
        });
        break;
      case 'googleMapLink':
        this.setState({
          googleMapLink: event.target.value,
        });
        break;

      // no default
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      mode,
      handleSubmitNewLocation,
      handleSubmitUpdateLocation,
    } = this.props;

    if (mode === 'new') {
      handleSubmitNewLocation(this.state);
    } else if (mode === 'update') {
      handleSubmitUpdateLocation(this.state);
    }
  }

  handleCancelButtonClick(event) {
    event.preventDefault();

    const { handleCancel } = this.props;

    handleCancel();
  }

  render() {
    const {
      name,
      positionLatitude,
      positionLongitude,
      website,
      googleMapLink,
    } = this.state;

    return (
      <form
        className="form-group space-top-sm space-bottom-sm"
        onSubmit={this.handleSubmit}
      >
        <div className="form-element">
          <label className="font-title-sm form-label" htmlFor="location-name">
            name:{' '}
            <input
              required
              type="text"
              id="location-name"
              value={name}
              onChange={this.handleFieldChange}
            />
          </label>
        </div>
        <div className="form-element">
          <label className="font-title-sm form-label" htmlFor="latitude">
            latitude:{' '}
            <input
              required
              type="text"
              id="latitude"
              value={positionLatitude}
              onChange={this.handleFieldChange}
            />
          </label>
        </div>
        <div className="form-element">
          <label className="font-title-sm form-label" htmlFor="longitude">
            longitude:{' '}
            <input
              required
              type="text"
              id="longitude"
              value={positionLongitude}
              onChange={this.handleFieldChange}
            />
          </label>
        </div>
        <div className="form-element">
          <label className="font-title-sm form-label" htmlFor="website">
            website:{' '}
            <input
              type="text"
              id="website"
              value={website}
              onChange={this.handleFieldChange}
            />
          </label>
        </div>
        <div className="form-element">
          <label className="font-title-sm form-label" htmlFor="googleMapLink">
            googleMapLink:{' '}
            <input
              type="text"
              id="googleMapLink"
              value={googleMapLink}
              onChange={this.handleFieldChange}
            />
          </label>
        </div>
        <div className="button-group">
          <input
            className="button_sm button_curious"
            type="submit"
            value="Submit"
          />
          <button
            type="button"
            className="button_sm button_medium"
            onClick={this.handleCancelButtonClick}
          >
            cancel
          </button>
        </div>
      </form>
    );
  }
}

LocationForm.defaultProps = defaultProps;
LocationForm.propTypes = propTypes;

export default LocationForm;
