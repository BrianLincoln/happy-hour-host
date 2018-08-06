import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PreviewableSpecial from './../PreviewableSpecial/PreviewableSpecial';
import pathHelpers from './../../utils/PathHelpers';
import './LocationListItem.scss';

const propTypes = {
  _id: PropTypes.string.isRequired,
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  specials: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
  })).isRequired,
};

function LocationListItem(props) {
  const specials = props.specials
    ? props.specials.map(special => (
      <PreviewableSpecial
        key={special._id}
        locationId={props._id}
        {...special}
      />
    ))
    : null;

  const path = pathHelpers.locationPath(
    props._id, props.city.name, props.name
  );

  return (
    <div className="location-list-item">
      <Link
        to={{
          pathname: path,
          state: {
            ...props,
          },
        }}
      >
        <h3 className="location-list-item-name">{props.name}</h3>
      </Link>
      <ul className="location-list-item-specials">{specials}</ul>
    </div>
  );
}

LocationListItem.propTypes = propTypes;

export default LocationListItem;
