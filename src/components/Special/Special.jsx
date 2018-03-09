import React from 'react';
import PropTypes from 'prop-types';
import './Special.scss';
import dayLabels from './../../utils/DayLabels';
import timeConverter from './../../utils/TimeConverter';

const propTypes = {
  _id: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  hasDrinkSpecial: PropTypes.bool.isRequired,
  hasFoodSpecial: PropTypes.bool.isRequired,
  headline: PropTypes.string.isRequired,
  days: PropTypes.arrayOf(PropTypes.number).isRequired,
  times: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function Special(props) {
  const days = props.days.map((day, index) => {
    const isLast = index + 1 === props.days.length;
    const labelText = isLast ? dayLabels[day] : `${dayLabels[day]}, `;

    return (
      <span className="font-sm" key={day}>
        {labelText}
      </span>
    );
  });

  const times = props.times.map((time) => {
    const startTime = timeConverter(time.start);
    const endTime = timeConverter(time.end);

    return (
      <div className="font-sm" key={time._id}>
        {startTime} - {endTime}
      </div>
    );
  });

  return (
    <li className="special row" key={props._id}>
      <div className="col-xs-10">
        <h3 className="space-bottom-xs">{props.headline}</h3>
        {days}
        {times}
      </div>
      <div className="col-xs-2 special-types">
        {props.hasDrinkSpecial ? <i className="fas fa-beer" aria-hidden="true" /> : null}
        {props.hasFoodSpecial ? <i className="fas fa-utensils" aria-hidden="true" /> : null}
      </div>
      <div className="col-xs-12 font-base-alt special-details">{props.details}</div>
    </li>
  );
}

Special.propTypes = propTypes;

export default Special;
