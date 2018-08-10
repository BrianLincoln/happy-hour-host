import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PreviewableSpecial.scss';
import RateSpecial from '../RateSpecial/RateSpecial';
import dayLabels from '../../utils/DayLabels';
import timeConverter from '../../utils/TimeConverter';

const propTypes = {
  _id: PropTypes.string.isRequired,
  locationId: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  hasDrinkSpecial: PropTypes.bool.isRequired,
  hasFoodSpecial: PropTypes.bool.isRequired,
  headline: PropTypes.string.isRequired,
  days: PropTypes.arrayOf(PropTypes.number).isRequired,
  times: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export class PreviewableSpecial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetails: false,
    };

    this.handleToggleDetailsClick = this.handleToggleDetailsClick.bind(this);
    this.handleToggleDetailsKeyUp = this.handleToggleDetailsKeyUp.bind(this);
  }

  handleToggleDetailsClick(event) {
    event.preventDefault();
    const { showDetails } = this.state;

    this.setState({
      showDetails: !showDetails,
    });
  }

  handleToggleDetailsKeyUp(event) {
    event.preventDefault();
    const { showDetails } = this.state;

    if (event.keyCode === 32) {
      this.setState({
        showDetails: !showDetails,
      });
    }
  }

  render() {
    const {
      days,
      times,
      details,
      _id,
      locationId,
      headline,
      hasDrinkSpecial,
      hasFoodSpecial,
    } = this.props;

    const { showDetails } = this.state;

    const daysCompenent = days.map((day, index) => {
      const isLast = index + 1 === days.length;
      const labelText = isLast ? dayLabels[day] : `${dayLabels[day]}, `;

      return (
        <span className="font-sm" key={day}>
          {labelText}
        </span>
      );
    });

    const timesComponent = times.map((time) => {
      const startTime = timeConverter(time.start);
      const endTime = timeConverter(time.end);

      return (
        <div className="font-sm" key={time._id}>
          {startTime} - {endTime}
        </div>
      );
    });

    const showDetailsComponent = !showDetails ? (
      <button
        type="button"
        className="previewable-special-toggle reset-button"
        onClick={this.handleToggleDetailsClick}
        onKeyUp={this.handleToggleDetailsKeyUp}
      >
        show details
        <span className="previewable-special-toggle-icon">
          <i className="fas fa-angle-down" />
        </span>
      </button>
    ) : null;

    const hideDetailsComponent = showDetails ? (
      <button
        type="button"
        className="previewable-special-toggle reset-button"
        onClick={this.handleToggleDetailsClick}
        onKeyUp={this.handleToggleDetailsKeyUp}
      >
        hide details
        <span className="previewable-special-toggle-icon">
          <i className="fas fa-angle-up" />
        </span>
      </button>
    ) : null;

    const detailsComponent = showDetails ? (
      <div className="previewable-special-details">
        {details}
        <RateSpecial _id={_id} locationId={locationId} />
      </div>
    ) : null;

    return (
      <div className="previewable-special" key={_id}>
        <div className="row">
          <div className="col-xs-10">
            <div className="font-base-alt space-bottom-xs">{headline}</div>
            {daysCompenent}
            {timesComponent}
          </div>
          <div className="col-xs-2 previewable-special-types">
            {hasDrinkSpecial ? (
              <i
                className="special-type-icon fas fa-glass-martini"
                aria-hidden="true"
              />
            ) : null}
            {hasFoodSpecial ? (
              <i
                className="special-type-icon fas fa-utensils"
                aria-hidden="true"
              />
            ) : null}
          </div>
          {showDetailsComponent}
          {hideDetailsComponent}
          {detailsComponent}
        </div>
      </div>
    );
  }
}

PreviewableSpecial.propTypes = propTypes;

export default PreviewableSpecial;
