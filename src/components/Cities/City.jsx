import React from 'react';
import PropTypes from 'prop-types';
import NeighborhoodList from '../Neighborhoods/NeighborhoodList';

const propTypes = {
  name: PropTypes.string.isRequired,
  neighborhoods: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
  })).isRequired,
};

function City(props) {
  return (
    <div>
      {/* this needs to be dynamic */}
      <h1>Food and drink specials in {props.name}</h1>
      <div className="row">
        <div className="col-xs-12 col-sm-6 homepage-category">
          <h2>Happy hours in your neighborhood</h2>
          <NeighborhoodList neighborhoods={props.neighborhoods} />
        </div>
      </div>
    </div>
  );
}

City.propTypes = propTypes;

export default City;
