import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RateSpecial.scss';
import locationApi from '../../utils/LocationApi';

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

    const { showRateForm } = this.state;

    this.setState({
      showRateForm: !showRateForm,
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
    const {
      locationId, _id,
    } = this.props;

    locationApi.rateSpecial(
      locationId, _id, isAccurate
    ).then((result) => {
      this.setState({
        showSpinner: true,
      },
      () => {
        setTimeout(() => {
          this.setState({
            formSuccess: result.success,
          });
        }, 1000);
      });
    });
  }

  render() {
    const { _id } = this.props;
    const {
      formSuccess, showSpinner, showRateForm,
    } = this.state;
    const toggleShowForm = (
      <button
        type="button"
        className="reset-button rate-special"
        onClick={this.handleShowRateSpecialForm}
        id={_id}
      >
        Is this accurate?
      </button>
    );

    let formContent = (
      <div className="rate-special-form">
        <button
          type="button"
          className="button_sm button_curious"
          onClick={this.handleYesButtonClick}
        >
          Yep, looks good!
        </button>
        <button
          type="button"
          className="button_sm button_valencia"
          onClick={this.handleNoButtonClick}
        >
          Nope
        </button>
      </div>
    );

    if (formSuccess) {
      formContent = (
        <div className="rate-special-form">
          <h3>Thanks!</h3>
        </div>
      );
    } else if (formSuccess === false) {
      formContent = (
        <div className="rate-special-form">
          <h3>Error Submitting</h3>
        </div>
      );
    } else if (showSpinner) {
      formContent = (
        <div className="rate-special-form">
          <div className="spinner-sm" />
        </div>
      );
    }

    return (
      <div>
        {toggleShowForm}
        {showRateForm ? formContent : null}
      </div>
    );
  }
}

RateSpecial.propTypes = propTypes;

export default RateSpecial;
