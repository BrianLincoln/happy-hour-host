import React from 'react';
import PropTypes from 'prop-types';
import LocationListItem from './LocationListItem';
import './LocationsList.scss';

const defaultProps = {
  selectedLocation: null,
};

const propTypes = {
  fetchingData: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
  })).isRequired,
  selectedLocation: PropTypes.shape({
    _id: PropTypes.string,
  }),
};

function LocationsList(props) {
  let locations = (
    <div className="card">
      <h2>No Results</h2>
      <p>Try zooming out or removing filters</p>
    </div>
  );

  if (props.fetchingData) {
    locations = <div className="spinner" />;
  }

  if (props.selectedLocation) {
    locations = (
      <LocationListItem
        key={props.selectedLocation._id}
        {...props.selectedLocation}
      />
    );
  } else if (props.locations.length > 0) {
    locations = props.locations.map(location => (
      <LocationListItem key={location._id} {...location} />
    ));
  }

  return (
    <div className="location-list-wrapper">
      <ul className="location-list">{locations}</ul>
    </div>
  );
}

LocationsList.defaultProps = defaultProps;
LocationsList.propTypes = propTypes;

export default LocationsList;
