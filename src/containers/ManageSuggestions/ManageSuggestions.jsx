/* eslint class-methods-use-this: ["error", { "exceptMethods": ["setDocumentTitle"] }] */
import React, { Component } from 'react';
import locationApi from './../../utils/LocationApi';
import cityApi from './../../utils/CityApi';
import ManageSuggestLocationForm from './../../components/ManageSuggestLocationForm/ManageSuggestLocationForm';
import './ManageSuggestions.scss';

class ManageSuggestions extends Component {
  constructor(props) {
    super(props);

    this.setDocumentTitle = this.setDocumentTitle.bind(this);
    this.fetchCities = this.fetchCities.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      fetchSuggestions: true,
      fetchingCities: true,
    };
  }

  componentDidMount() {
    this.setDocumentTitle();
    this.fetchSuggestions();
    this.fetchCities();
  }

  setDocumentTitle() {
    document.title = 'Manage Suggestions - Happy Hour Host';
  }

  fetchSuggestions() {
    locationApi.getLocationSuggestions().then((result) => {
      if (result.success) {
        this.setState({
          fetchSuggestions: false,
          suggestions: result.suggestions,
        });
      }
    });
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
    if (
      this.state.fetchSuggestions ||
      this.state.fetchingCities ||
      this.state.submittingForm
    ) {
      return <div className="spinner" />;
    }

    if (typeof this.state.formSuccess !== 'undefined') {
      if (this.state.formSuccess) {
        return <h1 className="hero-text">Saved Location</h1>;
      }

      return <h1 className="hero-text">Hmm... something went wrong</h1>;
    }
    if (this.state.selectedSuggest) {
      return (
        <ManageSuggestLocationForm
          handleSubmit={this.handleFormSubmit}
          cities={this.state.cities}
        />
      );
    }

    const suggestions = this.state.suggestions.map(suggestion => (
      <div className="list-item" key={suggestion._id}>
        {suggestion.name} -- {suggestion.date}
      </div>
    ));

    return (
      <div className="space-top-xl space-bottom-sm row">
        <div className="card col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
          <h1 className="card-heading">Suggestion List</h1>
          <div className="list-group">{suggestions}</div>
        </div>
      </div>
    );
  }
}

export default ManageSuggestions;
