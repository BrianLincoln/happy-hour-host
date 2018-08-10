import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cityApi from '../../../utils/CityApi';

const propTypes = {
  fetchCities: PropTypes.func.isRequired,
};

export class AddCity extends Component {
  constructor(props) {
    super(props);

    this.toggleAddCityForm = this.toggleAddCityForm.bind(this);
    this.handleCityNameChange = this.handleCityNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      cityName: '',
      showAddCityForm: false,
    };
  }

  toggleAddCityForm() {
    const { showAddCityForm } = this.state;

    this.setState({
      showAddCityForm: !showAddCityForm,
    });
  }

  handleCityNameChange(event) {
    this.setState({
      cityName: event.target.value,
    });
  }

  handleSubmit(event) {
    const { cityName } = this.state;
    const { fetchCities } = this.props;

    event.preventDefault();
    cityApi.postCity(cityName).then(() => fetchCities());
    this.setState({
      showAddCityForm: false,
    });
  }

  render() {
    const {
      showAddCityForm, cityName,
    } = this.state;

    if (showAddCityForm) {
      return (
        <div>
          <button
            type="button"
            onClick={this.toggleAddCityForm}
            className="button_sm button_dark"
          >
            x hide
          </button>
          <form
            className="space-top-sm space-bottom-sm"
            onSubmit={this.handleSubmit}
          >
            <label className="font-title-sm" htmlFor="city-name">
              name:{' '}
              <input
                required
                type="text"
                id="city-name"
                value={cityName}
                onChange={this.handleCityNameChange}
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
        onClick={this.toggleAddCityForm}
        className="button_sm button_dark admin-add-city-action"
      >
        + add city
      </button>
    );
  }
}

AddCity.propTypes = propTypes;

export default AddCity;
