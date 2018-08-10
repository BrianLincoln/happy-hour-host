import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpecialForm from './SpecialForm/SpecialForm';
import dayLabels from '../../../../utils/DayLabels';
import timeConverter from '../../../../utils/TimeConverter';

const propTypes = {
  special: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    details: PropTypes.string,
    headline: PropTypes.string.isRequired,
    hasDrinkSpecial: PropTypes.bool,
    hasFoodSpecial: PropTypes.bool,
    days: PropTypes.array,
    times: PropTypes.array,
  }).isRequired,
  deselectSpecial: PropTypes.func.isRequired,
  cancelEditSpecial: PropTypes.func.isRequired,
  handleSubmitEditSpecialForm: PropTypes.func.isRequired,
};

export class Special extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditSpecialForm: false,
    };

    this.toggleEditSpecial = this.toggleEditSpecial.bind(this);
    this.deselectSpecial = this.deselectSpecial.bind(this);
    this.handleSubmitEditSpecialForm = this.handleSubmitEditSpecialForm.bind(this);
    this.handleCancelSpecialForm = this.handleCancelSpecialForm.bind(this);
  }

  toggleEditSpecial() {
    const { showEditSpecialForm } = this.state;

    this.setState({
      showEditSpecialForm: !showEditSpecialForm,
    });
  }

  deselectSpecial(event) {
    event.preventDefault();

    const { deselectSpecial } = this.props;

    deselectSpecial();
  }

  handleSubmitEditSpecialForm(updatedSpecial) {
    const {
      handleSubmitEditSpecialForm, special,
    } = this.props;

    this.toggleEditSpecial();
    handleSubmitEditSpecialForm(updatedSpecial, special._id);
  }

  handleCancelSpecialForm() {
    const { cancelEditSpecial } = this.props;
    this.setState({
      showEditSpecialForm: false,
    },
    cancelEditSpecial());
  }

  render() {
    const { showEditSpecialForm } = this.state;
    const { special } = this.props;

    if (showEditSpecialForm) {
      return (
        <SpecialForm
          handleSubmitSpecialForm={this.handleSubmitEditSpecialForm}
          handleCancelSpecialForm={this.handleCancelSpecialForm}
          special={special}
        />
      );
    }
    const specialTypes = (
      <div>
        <div>
          drink specials:{' '}
          <input type="checkbox" checked={special.hasDrinkSpecial} disabled />
        </div>
        <div>
          food specials:{' '}
          <input type="checkbox" checked={special.hasFoodSpecial} disabled />
        </div>
      </div>
    );

    const days = special.days
      ? special.days.map((day, index) => {
        const isLast = index + 1 === special.days.length;
        const labelText = isLast ? dayLabels[day] : `${dayLabels[day]}, `;

        return (
          <span className="font-base-alt" key={day}>
            {labelText}
          </span>
        );
      })
      : "none (won't show on site)";

    const times = special.times && special.times.length > 0
      ? special.times.map((time) => {
        const startTime = timeConverter(time.start);
        const endTime = timeConverter(time.end);

        return (
          <div className="font-base-alt" key={time._id}>
            {startTime} - {endTime}
          </div>
        );
      })
      : 'Never';

    return (
      <div className="card">
        <div className="list-group">
          <div className="list-item">
            <span className="font-title-sm">{special.headline}</span>
          </div>

          <div className="list-item admin-special-details">
            {special.details}
          </div>
          <div className="list-item">{specialTypes}</div>
          <div className="list-item">{days}</div>
          <div className="list-item">{times}</div>

          <div className="space-top-md button-group button-group_left">
            <button
              type="button"
              onClick={this.toggleEditSpecial}
              className="button_sm button_curious"
            >
              + edit
            </button>
            <button
              type="button"
              onClick={this.deselectSpecial}
              className="button_sm button_dark"
            >
              back
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Special.propTypes = propTypes;

export default Special;
