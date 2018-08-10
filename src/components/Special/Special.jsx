import React from 'react';
import PropTypes from 'prop-types';
import './Special.scss';
import dayLabels from '../../utils/DayLabels';
import timeConverter from '../../utils/TimeConverter';

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
  const {
    days,
    times,
    hasDrinkSpecial,
    hasFoodSpecial,
    _id,
    headline,
    details,
  } = props;

  const daysComponent = days.map((day, index) => {
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

  const drinkSpecialComponent = hasDrinkSpecial ? (
    <div className="special-type">
      <i
        className="special-type-icon fas fa-fw fa-glass-martini"
        aria-hidden="true"
      />
      <div className="font-sm">Drink Specials</div>
    </div>
  ) : null;

  const foodSpecialComponent = hasFoodSpecial ? (
    <div className="special-type">
      <i
        className="special-type-icon fas fa-fw fa-utensils"
        aria-hidden="true"
      />
      <div className="font-sm">Food Specials</div>
    </div>
  ) : null;

  return (
    <div className="special row" key={_id}>
      <div className="col-xs-12 col-md-4">
        <h3 className="space-bottom-xs">{headline}</h3>
        {daysComponent}
        {timesComponent}
        <div className="font-base-alt special-details">{details}</div>
      </div>
      <div className="special-types col-xs-12 col-md-4">
        {drinkSpecialComponent}
        {foodSpecialComponent}
      </div>
    </div>
  );
}

Special.propTypes = propTypes;

export default Special;
