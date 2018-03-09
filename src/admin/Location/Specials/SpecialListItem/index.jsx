import React, { Component, } from 'react';
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
    this.props.selectSpecial(this.props.special);
  }

  handleDeleteButtonClick() {
    this.props.deleteSpecial(this.props.special._id);
  }

  render() {
    return (
      <div className="admin-location-listitem">
        <button onClick={this.handleClick}>
          <h3 key={this.props.special._id}>{this.props.special.headline}</h3>
        </button>
        <button className="button_sm button_valencia" onClick={this.handleDeleteButtonClick}>
          <i className="fas fa-trash" />
        </button>
      </div>
    );
  }
}

SpecialListItem.propTypes = propTypes;

export default SpecialListItem;
