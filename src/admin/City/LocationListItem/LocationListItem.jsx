import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LocationListItem.scss';

const propTypes = {
  cityId: PropTypes.string.isRequired,
  location: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  deleteLocation: PropTypes.func.isRequired,
};

export class LocationListItem extends Component {
  constructor() {
    super();

    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
  }

  handleDeleteButtonClick() {
    const {
      location, deleteLocation,
    } = this.props;

    if (window.confirm(`◔_◔ Super sure you want to delete ${location.name}?`)) {
      deleteLocation(location._id);
    }
  }

  render() {
    const {
      cityId, location,
    } = this.props;

    return (
      <div className="admin-location-listitem">
        <a href={`/admin/city/${cityId}/location/${location._id}`}>
          <h3 key={location._id}>{location.name}</h3>
        </a>
        <button
          type="button"
          className="button_sm button_valencia"
          onClick={this.handleDeleteButtonClick}
        >
          <i className="fas fa-trash" />
        </button>
      </div>
    );
  }
}

LocationListItem.propTypes = propTypes;

export default LocationListItem;
