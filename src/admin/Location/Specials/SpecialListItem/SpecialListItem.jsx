import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  special: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
  }).isRequired,
  deleteSpecial: PropTypes.func.isRequired,
  selectSpecial: PropTypes.func.isRequired,
};

export class SpecialListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleClick = this.handleClick.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
  }

  handleClick() {
    const {
      special, selectSpecial,
    } = this.props;

    selectSpecial(special);
  }

  handleDeleteButtonClick() {
    const {
      special, deleteSpecial,
    } = this.props;

    deleteSpecial(special._id);
  }

  render() {
    const { special } = this.props;

    return (
      <div className="admin-location-listitem">
        <button onClick={this.handleClick} type="button">
          <h3 key={special._id}>{special.headline}</h3>
        </button>
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

SpecialListItem.propTypes = propTypes;

export default SpecialListItem;
