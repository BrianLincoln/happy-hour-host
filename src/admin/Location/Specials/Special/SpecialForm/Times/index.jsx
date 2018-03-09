import React from 'react';
import PropTypes from 'prop-types';
import Time from './Time';

const propTypes = {
  times: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteTime: PropTypes.func.isRequired,
  handleShowTimeFormClick: PropTypes.func.isRequired,
};

function Times(props) {
  const times = props.times.map((time, index) => {
    const key = time.tempId !== undefined ? time.tempId : time._id;

    return <Time key={key} index={index} time={time} deleteTime={props.deleteTime} />;
  });

  return (
    <div className="form-element">
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <span className="font-title-sm">Times:</span>
        </div>
        <div className="col-xs-12 col-sm-6">
          <button onClick={props.handleShowTimeFormClick} className="button_sm button_dark">
            + add time
          </button>
        </div>
      </div>
      {times.length > 0 ? times : 'All Day'}
    </div>
  );
}

Times.propTypes = propTypes;

export default Times;
