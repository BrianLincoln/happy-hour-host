/* eslint class-methods-use-this: ["error", { "exceptMethods": ["setDocumentTitle"] }] */
import React, { Component } from 'react';
import locationApi from '../../utils/LocationApi';
import cityApi from '../../utils/CityApi';
import SuggestLocationForm from '../../components/SuggestLocationForm/SuggestLocationForm';
import './SuggestLocation.scss';

class SuggestLocation extends Component {
  constructor(props) {
    super(props);

    this.setDocumentTitle = this.setDocumentTitle.bind(this);
    this.fetchCities = this.fetchCities.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      fetchingCities: true,
    };
  }

  componentDidMount() {
    this.setDocumentTitle();
    this.fetchCities();
  }

  setDocumentTitle() {
    document.title = 'Suggest a Location - Happy Hour Host';
  }

  fetchCities() {
    cityApi.getCities().then((result) => {
      if (result.success) {
        this.setState({
          fetchingCities: false,
          cities: result.cities,
        });
      }
    });
  }

  handleFormSubmit(suggestion) {
    this.setState({
      submittingForm: true,
    });

    locationApi.postLocationSuggestion(suggestion).then((result) => {
      this.setState({
        submittingForm: false,
        formSuccess: result.success,
      });
    });
  }

  render() {
    const {
      fetchingCities, submittingForm, formSuccess, cities,
    } = this.state;

    if (fetchingCities || submittingForm) {
      return <div className="spinner" />;
    }

    if (typeof formSuccess !== 'undefined') {
      if (formSuccess) {
        return (
          <div className="hero-text">
            <h1>Thank you!</h1>
            <i className="hero-icon fas fa-heart color-valencia space-top-lg space-bottom-lg" />
            <h2>Teamwork makes the dream work.</h2>
          </div>
        );
      }

      return <h1 className="hero-text">Hmm... something went wrong</h1>;
    }

    return (
      <SuggestLocationForm
        handleSubmit={this.handleFormSubmit}
        cities={cities}
      />
    );
  }
}

export default SuggestLocation;
