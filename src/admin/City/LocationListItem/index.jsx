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
    if (window.confirm(`◔_◔ Super sure you want to delete ${this.props.location.name}?`)) {
      this.props.deleteLocation(this.props.location._id);
    }
  }

  render() {
    return (
      <div className="admin-location-listitem">
        <a href={`/admin/city/${this.props.cityId}/location/${this.props.location._id}`}>
          <h3 key={this.props.location._id}>{this.props.location.name}</h3>
        </a>
        <button className="button_sm button_valencia" onClick={this.handleDeleteButtonClick}>
          <i className="fas fa-trash" />
        </button>
      </div>
    );
  }
}

LocationListItem.propTypes = propTypes;

export default LocationListItem;
