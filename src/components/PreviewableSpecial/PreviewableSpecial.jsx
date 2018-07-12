import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PreviewableSpecial.scss';
import RateSpecial from './../RateSpecial/RateSpecial';
import dayLabels from './../../utils/DayLabels';
import timeConverter from './../../utils/TimeConverter';

const propTypes = {
  _id: PropTypes.string.isRequired,
  cityId: PropTypes.string.isRequired,
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
    this.setState({
      showDetails: !this.state.showDetails,
    });
  }

  handleToggleDetailsKeyUp(event) {
    event.preventDefault();

    if (event.keyCode === 32) {
      this.setState({
        showDetails: !this.state.showDetails,
      });
    }
  }

  render() {
    const days = this.props.days.map((day, index) => {
      const isLast = index + 1 === this.props.days.length;
      const labelText = isLast ? dayLabels[day] : `${dayLabels[day]}, `;

      return (
        <span className="font-sm" key={day}>
          {labelText}
        </span>
      );
    });

    const times = this.props.times.map((time) => {
      const startTime = timeConverter(time.start);
      const endTime = timeConverter(time.end);

      return (
        <div className="font-sm" key={time._id}>
          {startTime} - {endTime}
        </div>
      );
    });

    const showDetails = !this.state.showDetails ? (
      <button
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

    const hideDetails = this.state.showDetails ? (
      <button
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

    const details = this.state.showDetails ? (
      <div className="previewable-special-details">
        {this.props.details}
        <RateSpecial
          _id={this.props._id}
          cityId={this.props.cityId}
          locationId={this.props.locationId}
        />
      </div>
    ) : null;

    return (
      <div className="previewable-special" key={this.props._id}>
        <div className="row">
          <div className="col-xs-10">
            <div className="font-base-alt space-bottom-xs">{this.props.headline}</div>
            {days}
            {times}
          </div>
          <div className="col-xs-2 previewable-special-types">
            {this.props.hasDrinkSpecial ? (
              <i className="special-type-icon fas fa-glass-martini" aria-hidden="true" />
            ) : null}
            {this.props.hasFoodSpecial ? (
              <i className="special-type-icon fas fa-utensils" aria-hidden="true" />
            ) : null}
          </div>
          {showDetails}
          {hideDetails}
          {details}
        </div>
      </div>
    );
  }
}

PreviewableSpecial.propTypes = propTypes;

export default PreviewableSpecial;
