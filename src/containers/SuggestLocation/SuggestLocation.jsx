/* eslint class-methods-use-this: ["error", { "exceptMethods": ["setDocumentTitle"] }] */
import React, { Component } from 'react';
import locationApi from './../../utils/LocationApi';
import cityApi from './../../utils/CityApi';
import SuggestLocationForm from './../../components/SuggestLocationForm/SuggestLocationForm';
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
    if (this.state.fetchingCities || this.state.submittingForm) {
      return <div className="spinner" />;
    }

    if (typeof this.state.formSuccess !== 'undefined') {
      if (this.state.formSuccess) {
        return (
          <h1 className="hero-text">Thanks! Teamwork makes the dream work.</h1>
        );
      }

      return <h1 className="hero-text">Hmm... something went wrong</h1>;
    }

    return (
      <SuggestLocationForm
        handleSubmit={this.handleFormSubmit}
        cities={this.state.cities}
      />
    );
  }
}

export default SuggestLocation;
