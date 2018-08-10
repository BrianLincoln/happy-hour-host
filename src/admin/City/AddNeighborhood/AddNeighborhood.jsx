import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  postNeighborhood: PropTypes.func.isRequired,
};

export class AddNeighborhood extends Component {
  constructor(props) {
    super(props);

    this.toggleAddNeighborhoodForm = this.toggleAddNeighborhoodForm.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: '',
      showAddNeighborhoodForm: false,
    };
  }

  toggleAddNeighborhoodForm() {
    const { showAddNeighborhoodForm } = this.state;

    this.setState({
      showAddNeighborhoodForm: !showAddNeighborhoodForm,
    });
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { name } = this.state;
    const { postNeighborhood } = this.props;

    const neighborhood = {
      name,
      mapCenter: {
        latitude: 0,
        longitude: 0,
      },
      mapZoomLevel: 13,
      mapPoly: [],
    };

    postNeighborhood(neighborhood);
    this.setState({
      showAddNeighborhoodForm: false,
    });
  }

  render() {
    const {
      showAddNeighborhoodForm, name,
    } = this.state;

    if (showAddNeighborhoodForm) {
      return (
        <div>
          <button
            type="button"
            onClick={this.toggleAddNeighborhoodForm}
            className="button_sm button_dark"
          >
            x hide
          </button>
          <form
            className="space-top-sm space-bottom-sm"
            onSubmit={this.handleSubmit}
          >
            <label className="font-title-sm" htmlFor="neighborhood-name">
              name:{' '}
              <input
                required
                type="text"
                id="neighborhood-name"
                value={name}
                onChange={this.handleNameChange}
              />
            </label>
            <input
              className="button_sm button_curious"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={this.toggleAddNeighborhoodForm}
        className="button_sm button_dark"
      >
        + add neighborhood
      </button>
    );
  }
}

AddNeighborhood.propTypes = propTypes;

export default AddNeighborhood;
