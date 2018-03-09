import React, { Component } from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
  location: null,
  handleSubmitUpdateLocation: undefined,
  handleSubmitNewLocation: undefined,
};

const propTypes = {
  mode: PropTypes.string.isRequired,
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

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);

    if (this.props.mode === 'update') {
      this.state = {
        _id: this.props.location._id,
        name: this.props.location.name ? this.props.location.name : '',
        positionLatitude: this.props.location.position.latitude
          ? this.props.location.position.latitude
          : '',
        positionLongitude: this.props.location.position.longitude
          ? this.props.location.position.longitude
          : '',
        neighborhoods: this.props.location.neighborhoods ? this.props.location.neighborhoods : [],
        website: this.props.location.website ? this.props.location.website : '',
        googleMapLink: this.props.location.googleMapLink ? this.props.location.googleMapLink : '',
      };
    } else {
      this.state = {
        name: '',
        positionLatitude: '',
        positionLongitude: '',
        neighborhoods: [],
        specials: [],
        website: '',
        googleMapLink: '',
      };
    }
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
    if (this.props.mode === 'new') {
      this.props.handleSubmitNewLocation(this.state);
    } else if (this.props.mode === 'update') {
      this.props.handleSubmitUpdateLocation(this.state);
    }
  }

  handleCancelButtonClick(event) {
    event.preventDefault();
    this.props.handleCancel();
  }

  render() {
    return (
      <form className="form-group space-top-sm space-bottom-sm" onSubmit={this.handleSubmit}>
        <div className="form-element">
          <label className="font-title-sm form-label" htmlFor="location-name">
            name:{' '}
            <input
              required
              type="text"
              id="location-name"
              value={this.state.name}
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
              value={this.state.positionLatitude}
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
              value={this.state.positionLongitude}
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
              value={this.state.website}
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
              value={this.state.googleMapLink}
              onChange={this.handleFieldChange}
            />
          </label>
        </div>
        <div className="button-group">
          <input className="button_sm button_curious" type="submit" value="Submit" />
          <button className="button_sm button_medium" onClick={this.handleCancelButtonClick}>
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
