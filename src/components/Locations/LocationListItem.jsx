import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SpecialPreview from './../Special/SpecialPreview';
import './LocationListItem.scss';

const propTypes = {
  name: PropTypes.string.isRequired,
  cityName: PropTypes.string.isRequired,
  specials: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
  })).isRequired,
};

function LocationListItem(props) {
  const specials = props.specials
    ? props.specials.map(special => <SpecialPreview key={special._id} {...special} />)
    : null;

  const path = encodeURI(`/${props.cityName}/${props.name}`.trim().replace(' ', '+'));

  return (
    <Link
      className="location-list-item"
      to={{
        pathname: path,
        state: {
          ...props,
        },
      }}
    >
      <h3>{props.name}</h3>
      <ul className="location-list-item-specials">{specials}</ul>
    </Link>
  );
}

LocationListItem.propTypes = propTypes;

export default LocationListItem;
