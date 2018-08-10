import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocationForm from '../../Location/LocationForm/LocationForm';

const propTypes = {
  cityId: PropTypes.string.isRequired,
  postLocation: PropTypes.func.isRequired,
};

export class AddLocation extends Component {
  constructor(props) {
    super(props);

    this.toggleAddLocationForm = this.toggleAddLocationForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      showAddLocationForm: false,
    };
  }

  toggleAddLocationForm() {
    const { showAddLocationForm } = this.state;

    this.setState({
      showAddLocationForm: !showAddLocationForm,
    });
  }

  handleSubmit(location) {
    const { postLocation } = this.props;

    postLocation(location);
    this.toggleAddLocationForm();
  }

  render() {
    const { showAddLocationForm } = this.state;
    const { cityId } = this.props;
    if (showAddLocationForm) {
      return (
        <div>
          <button
            type="button"
            onClick={this.toggleAddLocationForm}
            className="button_sm button_dark"
          >
            x hide
          </button>
          <LocationForm
            cityId={cityId}
            mode="new"
            handleCancel={this.toggleAddLocationForm}
            handleSubmitNewLocation={this.handleSubmit}
          />
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={this.toggleAddLocationForm}
        className="button_sm button_dark"
      >
        + add location
      </button>
    );
  }
}

AddLocation.propTypes = propTypes;

export default AddLocation;
