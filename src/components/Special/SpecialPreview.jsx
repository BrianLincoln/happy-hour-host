import React from 'react';
import PropTypes from 'prop-types';
import './Special.scss';
import dayLabels from './../../utils/DayLabels';
import timeConverter from './../../utils/TimeConverter';

const propTypes = {
  _id: PropTypes.string.isRequired,
  hasDrinkSpecial: PropTypes.bool.isRequired,
  hasFoodSpecial: PropTypes.bool.isRequired,
  headline: PropTypes.string.isRequired,
  days: PropTypes.arrayOf(PropTypes.number).isRequired,
  times: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function SpecialPreview(props) {
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
    <li className="special-preview" key={props._id}>
      <div className="row">
        <div className="col-xs-10">
          <div className="font-base-alt space-bottom-xs">{props.headline}</div>
          {days}
          {times}
        </div>
        <div className="col-xs-2 special-types">
          {props.hasDrinkSpecial ? (
            <i className="special-type-icon fas fa-beer" aria-hidden="true" />
          ) : null}
          {props.hasFoodSpecial ? (
            <i className="special-type-icon fas fa-utensils" aria-hidden="true" />
          ) : null}
        </div>
      </div>
    </li>
  );
}

SpecialPreview.propTypes = propTypes;

export default SpecialPreview;
