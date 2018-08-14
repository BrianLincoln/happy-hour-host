import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RateSpecialForm from './RateSpecialForm';
import { UserConsumer } from '../../utils/UserContext';
import './RateSpecial.scss';
import ratingApi from '../../utils/RatingApi';

const propTypes = {
  _id: PropTypes.string.isRequired,
};

export class RateSpecial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRateForm: false,
    };

    this.handleShowRateSpecialForm = this.handleShowRateSpecialForm.bind(this);
    this.submitRatingForm = this.submitRatingForm.bind(this);
  }

  handleShowRateSpecialForm(event) {
    event.preventDefault();
    event.stopPropagation();

    const { showRateForm } = this.state;

    this.setState({
      showRateForm: !showRateForm,
    });
  }

  submitRatingForm(isAccurate) {
    const { _id } = this.props;

    ratingApi.rateSpecial(_id, isAccurate).then((result) => {
      this.setState({
        showSpinner: true,
      },
      () => {
        setTimeout(() => {
          this.setState({
            formSuccess: result.success,
            showSpinner: false,
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

    const toggleShowFormComponent = (
      <button
        type="button"
        className="reset-button rate-special"
        onClick={this.handleShowRateSpecialForm}
        id={_id}
      >
        Is this accurate?
      </button>
    );

    const formSuccessComponent = formSuccess ? (
      <div className="rate-special-form">
        <h3>Thanks!</h3>
      </div>
    ) : null;

    const formErrorComponent = formSuccess === false ? (
      <div className="rate-special-form">
        <h3>Error Submitting</h3>
      </div>
    ) : null;

    const spinnerComponent = showSpinner ? (
      <div className="rate-special-form">
        <div className="spinner-sm" />
      </div>
    ) : null;

    return (
      <UserConsumer>
        {context => (
          <div>
            {toggleShowFormComponent}
            {showRateForm && context.isLoggedIn ? (
              <RateSpecialForm submitRatingForm={this.submitRatingForm} />
            ) : null}

            {showRateForm && !context.isLoggedIn ? (
              <div className="rate-special-form">
                <p className="space-bottom-lg">
                  <Link
                    className="rate-special-link"
                    to={{
                      pathname: '/login',
                    }}
                  >
                    Log in
                  </Link>{' '}
                  or{' '}
                  <Link
                    className="rate-special-link"
                    to={{
                      pathname: '/signup',
                    }}
                  >
                    sign up
                  </Link>{' '}
                  to report inaccurate specials.
                </p>
              </div>
            ) : null}
            {formSuccessComponent}
            {formErrorComponent}
            {spinnerComponent}
          </div>
        )}
      </UserConsumer>
    );
  }
}

RateSpecial.propTypes = propTypes;

export default RateSpecial;
