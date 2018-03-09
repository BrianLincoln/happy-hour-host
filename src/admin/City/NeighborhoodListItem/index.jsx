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
    if (window.confirm(`◔_◔ Super sure you want to delete ${this.props.neighborhood.name}?`)) {
      this.props.deleteNeighborhood(this.props.neighborhood._id);
    }
  }

  render() {
    return (
      <div className="admin-neighborhood-listitem">
        <a href={`/admin/city/${this.props.cityId}/neighborhood/${this.props.neighborhood._id}`}>
          <h3 key={this.props.neighborhood._id}>{this.props.neighborhood.name}</h3>
        </a>
        <button className="button_sm button_valencia" onClick={this.handleDeleteButtonClick}>
          <i className="fas fa-trash" />
        </button>
      </div>
    );
  }
}

NeighborhoodListItem.propTypes = propTypes;

export default NeighborhoodListItem;
