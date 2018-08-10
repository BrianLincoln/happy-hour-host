import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CityListItem.scss';

const propTypes = {
  city: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  deleteCity: PropTypes.func.isRequired,
};

export class CityListItem extends Component {
  constructor() {
    super();

    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
  }

  handleDeleteButtonClick() {
    const {
      city, deleteCity,
    } = this.props;

    if (window.confirm(`◔_◔ Super sure you want to delete ${city.name}?`)) {
      deleteCity(city._id);
    }
  }

  render() {
    const { city } = this.props;

    return (
      <div className="admin-city-listitem">
        <a href={`/admin/city/${city._id}`}>
          <h3 key={city._id}>{city.name}</h3>
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

CityListItem.propTypes = propTypes;

export default CityListItem;
