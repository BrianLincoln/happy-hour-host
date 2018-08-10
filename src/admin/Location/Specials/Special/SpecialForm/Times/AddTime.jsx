import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  handleCancelTimeForm: PropTypes.func.isRequired,
  handleSubmitNewTime: PropTypes.func.isRequired,
};

export class AddTime extends Component {
  constructor(props) {
    super(props);

    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);

    this.state = {
      time: {},
    };
  }

  handleTimeChange(event) {
    const { time } = this.state;

    const newTime = time || {};

    switch (event.target.id) {
      case 'start-time':
        newTime.start = event.target.value;
        break;
      case 'end-time':
        newTime.end = event.target.value;
        break;

      // no default
    }
    this.setState({
      time: newTime,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { handleSubmitNewTime } = this.props;
    const { time } = this.state;

    const validationText = this.validateForm();

    if (validationText.length > 0) {
      this.setState({
        validationText,
      });
    } else {
      handleSubmitNewTime(time.start, time.end);
    }
  }

  validateForm() {
    const { time } = this.state;
    let result = '';

    if (!time.start || !time.end) {
      result = 'Missing Time';
    }

    return result;
  }

  render() {
    const { validationText } = this.state;
    const { handleCancelTimeForm } = this.props;

    return (
      <div>
        <h2>Add Time</h2>
        <div className="form-element">
          <label className="form-label" htmlFor="start-time">
            start time
            <input
              onChange={this.handleTimeChange}
              required
              id="start-time"
              type="time"
            />
          </label>
        </div>
        <div className="form-element">
          <label className="form-label" htmlFor="end-time">
            end time
            <input
              onChange={this.handleTimeChange}
              required
              id="end-time"
              type="time"
            />
          </label>
        </div>
        {validationText ? (
          <div className="validation-text">{validationText}</div>
        ) : null}
        <button
          type="submit"
          onClick={this.handleSubmit}
          className="button_sm button_curious"
        >
          save
        </button>
        <button
          type="button"
          onClick={handleCancelTimeForm}
          className="button_sm button_medium"
        >
          cancel
        </button>
      </div>
    );
  }
}

AddTime.propTypes = propTypes;

export default AddTime;
