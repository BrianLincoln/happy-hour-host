import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Days from './Days/Days';
import Times from './Times/Times';
import AddTime from './Times/AddTime';
import './SpecialForm.scss';

const defaultProps = {
  special: undefined,
};

const propTypes = {
  special: PropTypes.shape({
    headline: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    days: PropTypes.array,
    times: PropTypes.array,
    hasDrinkSpecial: PropTypes.bool,
    hasFoodSpecial: PropTypes.bool,
  }),
  handleCancelSpecialForm: PropTypes.func.isRequired,
  handleSubmitSpecialForm: PropTypes.func.isRequired,
};

export class SpecialForm extends Component {
  constructor(props) {
    super(props);

    const { special } = this.props;

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);

    // times
    this.handleShowTimeFormClick = this.handleShowTimeFormClick.bind(this);
    this.handleSubmitNewTime = this.handleSubmitNewTime.bind(this);
    this.handleCancelTimeForm = this.handleCancelTimeForm.bind(this);
    this.deleteTime = this.deleteTime.bind(this);

    this.handleCancelSpecialFormButtonClick = this.handleCancelSpecialFormButtonClick.bind(this);
    this.handleSubmitSpecialForm = this.handleSubmitSpecialForm.bind(this);
    this.validateForm = this.validateForm.bind(this);

    if (special) {
      this.state = {
        headline: special.headline ? special.headline : '',
        days: special.days ? special.days : [],
        times: special.times ? special.times : [],
        details: special.details ? special.details : '',
        hasDrinkSpecial: special.hasDrinkSpecial
          ? special.hasDrinkSpecial
          : false,
        hasFoodSpecial: special.hasFoodSpecial ? special.hasFoodSpecial : false,
      };
    } else {
      this.state = {
        headline: '',
        days: [],
        times: [],
        details: '',
        hasDrinkSpecial: false,
        hasFoodSpecial: false,
      };
    }
  }

  handleFieldChange(event) {
    const {
      hasDrinkSpecial, hasFoodSpecial,
    } = this.state;

    switch (event.target.id) {
      case 'headline':
        this.setState({
          headline: event.target.value,
        });
        break;
      case 'details':
        this.setState({
          details: event.target.value,
        });
        break;
      case 'hasDrinkSpecial':
        this.setState({
          hasDrinkSpecial: !hasDrinkSpecial,
        });
        break;
      case 'hasFoodSpecial':
        this.setState({
          hasFoodSpecial: !hasFoodSpecial,
        });
        break;

      // no default
    }
  }

  handleDayChange(newDays) {
    this.setState({
      days: newDays,
    });
  }

  // Times
  handleShowTimeFormClick(event) {
    event.preventDefault();
    this.setState({
      showAddTimeForm: true,
    });
  }

  handleSubmitNewTime(start, end) {
    const { times } = this.state;

    const newTime = {
      start,
      end,
      pending: true,
      tempId: `tempID_${Date.now()}`, // for the unique key in map function -- not stored in db
    };
    const newTimes = times.slice();
    newTimes.push(newTime);
    this.setState({
      times: newTimes,
      showAddTimeForm: false,
    });
  }

  handleCancelTimeForm(event) {
    event.preventDefault();
    this.setState({
      showAddTimeForm: false,
    });
  }

  deleteTime(index) {
    const { times } = this.state;

    times.splice(index, 1);
    this.setState({
      times,
    });
  }

  handleCancelSpecialFormButtonClick(event) {
    event.preventDefault();
    const { handleCancelSpecialForm } = this.props;

    handleCancelSpecialForm();
  }

  handleSubmitSpecialForm(event) {
    event.preventDefault();
    const validationText = this.validateForm();
    const { handleSubmitSpecialForm } = this.props;

    if (validationText.length > 0) {
      this.setState({
        validationText,
      });
    } else {
      handleSubmitSpecialForm(this.state);
    }
  }

  validateForm() {
    const { days } = this.state;
    let result = '';

    if (days.length < 1) {
      result = 'No Days Seleted';
    }

    return result;
  }

  render() {
    let formView = null;
    const {
      showAddTimeForm,
      headline,
      details,
      hasDrinkSpecial,
      hasFoodSpecial,
      days,
      times,
      validationText,
    } = this.state;

    if (showAddTimeForm) {
      formView = (
        <AddTime
          handleSubmitNewTime={this.handleSubmitNewTime}
          handleCancelTimeForm={this.handleCancelTimeForm}
        />
      );
    } else {
      formView = (
        <div>
          <div className="form-element">
            <label className="form-label" htmlFor="headline">
              headline:{' '}
              <input
                required
                type="text"
                id="headline"
                value={headline}
                onChange={this.handleFieldChange}
              />
            </label>
          </div>
          <div className="form-element">
            <label className="form-label" htmlFor="details">
              details:{' '}
              <textarea
                required
                id="details"
                value={details}
                onChange={this.handleFieldChange}
              />
            </label>
          </div>
          <div className="form-element">
            <label className="form-label" htmlFor="hasDrinkSpecial">
              drink special:{' '}
              <input
                type="checkbox"
                id="hasDrinkSpecial"
                checked={hasDrinkSpecial}
                onChange={this.handleFieldChange}
              />
            </label>
          </div>
          <div className="form-element">
            <label className="form-label" htmlFor="hasFoodSpecial">
              food special:{' '}
              <input
                type="checkbox"
                id="hasFoodSpecial"
                checked={hasFoodSpecial}
                onChange={this.handleFieldChange}
              />
            </label>
          </div>
          <Days handleDayChange={this.handleDayChange} days={days} />
          <Times
            handleShowTimeFormClick={this.handleShowTimeFormClick}
            deleteTime={this.deleteTime}
            times={times}
          />
          {validationText ? (
            <div className="validation-text">{validationText}</div>
          ) : null}
          <div className="button-group button-group_left">
            <input
              className="button_sm button_curious"
              type="submit"
              value="Submit"
            />
            <button
              type="button"
              className="button_sm button_medium"
              onClick={this.handleCancelSpecialFormButtonClick}
            >
              cancel
            </button>
          </div>
        </div>
      );
    }

    return (
      <form
        className="special-form-wrapper form-group space-top-sm space-bottom-sm"
        onSubmit={this.handleSubmitSpecialForm}
      >
        {formView}
      </form>
    );
  }
}

SpecialForm.defaultProps = defaultProps;
SpecialForm.propTypes = propTypes;

export default SpecialForm;
