import React from 'react';
import PropTypes from 'prop-types';
import './RateSpecial.scss';

const propTypes = {
  submitRatingForm: PropTypes.func.isRequired,
};

function RateSpecialForm(props) {
  const handleYesButtonClick = (event) => {
    event.preventDefault();

    props.submitRatingForm(true);
  };

  const handleNoButtonClick = (event) => {
    event.preventDefault();

    props.submitRatingForm(false);
  };

  return (
    <div className="rate-special-form">
      <button
        type="button"
        className="button_sm button_curious"
        onClick={handleYesButtonClick}
      >
        Yep, looks good!
      </button>
      <button
        type="button"
        className="button_sm button_valencia"
        onClick={handleNoButtonClick}
      >
        Nope
      </button>
    </div>
  );
}

RateSpecialForm.propTypes = propTypes;

export default RateSpecialForm;
