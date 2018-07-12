import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PreviewableSpecial from './../PreviewableSpecial/PreviewableSpecial';
import './LocationListItem.scss';

const propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cityId: PropTypes.string.isRequired,
  cityName: PropTypes.string.isRequired,
  specials: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
  })).isRequired,
};

function LocationListItem(props) {
  const specials = props.specials
    ? props.specials.map(special => (
      <PreviewableSpecial
        key={special._id}
        cityId={props.cityId}
        locationId={props._id}
        {...special}
      />
    ))
    : null;

  const path = encodeURI(`/${props.cityName}/${props.name}`.trim().replace(' ', '+'));

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
