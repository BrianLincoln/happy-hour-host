import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RateSpecial.scss';
import locationApi from './../../utils/LocationApi';

const propTypes = {
  _id: PropTypes.string.isRequired,
  locationId: PropTypes.string.isRequired,
};

export class RateSpecial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRateForm: false,
    };

    this.handleShowRateSpecialForm = this.handleShowRateSpecialForm.bind(this);
    this.handleYesButtonClick = this.handleYesButtonClick.bind(this);
    this.handleNoButtonClick = this.handleNoButtonClick.bind(this);
    this.submitSpecialForm = this.submitSpecialForm.bind(this);
  }

  handleShowRateSpecialForm(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      showRateForm: !this.state.showRateForm,
    });
  }

  handleYesButtonClick(event) {
    event.preventDefault();

    this.submitSpecialForm(true);
  }

  handleNoButtonClick(event) {
    event.preventDefault();

    this.submitSpecialForm(false);
  }

  submitSpecialForm(isAccurate) {
    locationApi
      .rateSpecial(
        this.props.locationId, this.props._id, isAccurate
      )
      .then(() => {
        this.setState({
          showSpinner: true,
        },
        () => {
          setTimeout(() => {
            this.setState({
              submittedRateForm: true,
            });
          }, 1000);
        });
      });
  }

  render() {
    const toggleShowForm = (
      <button
        className="reset-button rate-special"
        onClick={this.handleShowRateSpecialForm}
        id={this.props._id}
      >
        Is this accurate?
      </button>
    );

    let formContent = (
      <div className="rate-special-form">
        <button
          className="button_sm button_curious"
          onClick={this.handleYesButtonClick}
        >
          Yep, looks good!
        </button>
        <button
          className="button_sm button_valencia"
          onClick={this.handleNoButtonClick}
        >
          Nope
        </button>
      </div>
    );

    if (this.state.submittedRateForm) {
      formContent = (
        <div className="rate-special-form">
          <h3>Thanks!</h3>
        </div>
      );
    } else if (this.state.showSpinner) {
      formContent = (
        <div className="rate-special-form">
          <div className="spinner-sm" />
        </div>
      );
    }

    return (
      <div>
        {toggleShowForm}
        {this.state.showRateForm ? formContent : null}
      </div>
    );
  }
}

RateSpecial.propTypes = propTypes;

export default RateSpecial;
