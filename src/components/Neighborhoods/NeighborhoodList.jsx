import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './NeighborhoodList.scss';

const defaultProps = {
  locations: [],
};

const propTypes = {
  city: PropTypes.shape({
    neighborhoods: PropTypes.array,
    name: PropTypes.string,
  }).isRequired,
  fetchingData: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
  })),
};

function NeighborhoodList(props) {
  let neighborhoods = null;

  if (props.fetchingData) {
    neighborhoods = <div className="spinner" />;
  } else {
    neighborhoods = props.city.neighborhoods.map((neighborhood) => {
      let path = `/${props.city.name}/neighborhood/${neighborhood.name}`;
      path = path.replace(' ', '+');

      return (
        <Link
          className="neighborhood-list-item"
          key={neighborhood._id}
          to={{
            pathname: path,
            state: {
              cityName: props.city.name,
              locations: props.locations,
              neighborhood,
            },
          }}
        >
          {neighborhood.name}
        </Link>
      );
    });
  }

  return <ul>{neighborhoods}</ul>;
}

NeighborhoodList.defaultProps = defaultProps;
NeighborhoodList.propTypes = propTypes;

export default NeighborhoodList;
