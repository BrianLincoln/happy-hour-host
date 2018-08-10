import React from 'react';
import PropTypes from 'prop-types';
import Time from './Time';

const propTypes = {
  times: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteTime: PropTypes.func.isRequired,
  handleShowTimeFormClick: PropTypes.func.isRequired,
};

function Times(props) {
  const {
    times, deleteTime, handleShowTimeFormClick,
  } = props;

  const timesComponent = times.map((time, index) => {
    const key = time.tempId !== undefined ? time.tempId : time._id;

    return <Time key={key} index={index} time={time} deleteTime={deleteTime} />;
  });

  return (
    <div className="form-element">
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <span className="font-title-sm">Times:</span>
        </div>
        <div className="col-xs-12 col-sm-6">
          <button
            type="button"
            onClick={handleShowTimeFormClick}
            className="button_sm button_dark"
          >
            + add time
          </button>
        </div>
      </div>

      {timesComponent}
    </div>
  );
}

Times.propTypes = propTypes;

export default Times;
