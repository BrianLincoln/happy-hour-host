import React from 'react';
import PropTypes from 'prop-types';
import NeighborhoodList from '../Neighborhoods/NeighborhoodList';

const propTypes = {
  city: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
  })).isRequired,
  fetchingData: PropTypes.bool.isRequired,
};

function City(props) {
  return (
    <div>
      {/* this needs to be dynamic */}
      <h1>Food and drink specials in Minneapolis</h1>
      <div className="row">
        <div className="col-xs-12 col-sm-6 homepage-category">
          <h2>Happy hours in your neighborhood</h2>
          <NeighborhoodList
            city={props.city}
            locations={props.locations}
            fetchingData={props.fetchingData}
          />
        </div>
      </div>
    </div>
  );
}

City.propTypes = propTypes;

export default City;
