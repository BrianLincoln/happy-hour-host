import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NeighborhoodListItem.scss';

const propTypes = {
  cityId: PropTypes.string.isRequired,
  neighborhood: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  deleteNeighborhood: PropTypes.func.isRequired,
};

export class NeighborhoodListItem extends Component {
  constructor() {
    super();

    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
  }

  handleDeleteButtonClick() {
    const {
      neighborhood, deleteNeighborhood,
    } = this.props;

    if (
      window.confirm(`◔_◔ Super sure you want to delete ${neighborhood.name}?`)
    ) {
      deleteNeighborhood(neighborhood._id);
    }
  }

  render() {
    const {
      cityId, neighborhood,
    } = this.props;

    return (
      <div className="admin-neighborhood-listitem">
        <a href={`/admin/city/${cityId}/neighborhood/${neighborhood._id}`}>
          <h3 key={neighborhood._id}>{neighborhood.name}</h3>
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

NeighborhoodListItem.propTypes = propTypes;

export default NeighborhoodListItem;
