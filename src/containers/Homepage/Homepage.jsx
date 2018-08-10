import React from 'react';
import PropTypes from 'prop-types';
import './Homepage.scss';
import MapSection from '../MapSection/MapSection';

const propTypes = {
  config: PropTypes.shape({
    googleMapsApiKey: PropTypes.string,
  }).isRequired,
};

function Homepage(props) {
  const {
    config: { googleMapsApiKey },
  } = props;

  return (
    <div>
      <MapSection googleMapsApiKey={googleMapsApiKey} />
    </div>
  );
}

Homepage.propTypes = propTypes;

export default Homepage;
