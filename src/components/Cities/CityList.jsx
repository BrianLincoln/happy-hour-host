import React from 'react';
import PropTypes from 'prop-types';
import City from './City';

const propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
  })).isRequired,
};

function CityList(props) {
  const cities = props.cities.map((city) => {
    if (city && city.neighborhoods.length > 0) {
      return (
        <City
          key={city._id}
          city={city}
          locations={city.locations}
          fetchingLocations={props.fetchingLocations}
        />
      );
    }

    return null;
  });

  return <div>{cities}</div>;
}

CityList.propTypes = propTypes;

export default CityList;
