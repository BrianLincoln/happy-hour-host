/* eslint class-methods-use-this: ["error", { "exceptMethods": ["setDocumentTitle"] }] */
import React, { Component } from 'react';
import locationApi from '../../utils/LocationApi';
import './ManageSuggestions.scss';

class ManageSuggestions extends Component {
  constructor(props) {
    super(props);

    this.setDocumentTitle = this.setDocumentTitle.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      fetchSuggestions: true,
      fetchingCities: true,
    };
  }

  componentDidMount() {
    this.setDocumentTitle();
    this.fetchSuggestions();
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
      fetchSuggestions,
      fetchingCities,
      submittingForm,
      formSuccess,
      suggestions,
    } = this.state;
    if (fetchSuggestions || fetchingCities || submittingForm) {
      return <div className="spinner" />;
    }

    if (typeof formSuccess !== 'undefined') {
      if (formSuccess) {
        return <h1 className="hero-text">Saved Location</h1>;
      }

      return <h1 className="hero-text">Hmm... something went wrong</h1>;
    }

    const suggestionsComponent = suggestions.map(suggestion => (
      <div className="list-item" key={suggestion._id}>
        {suggestion.name} -- {suggestion.date}
      </div>
    ));

    return (
      <div className="space-top-xl space-bottom-sm row">
        <div className="card col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
          <h1 className="card-heading">Suggestion List</h1>
          <div className="list-group">{suggestionsComponent}</div>
        </div>
      </div>
    );
  }
}

export default ManageSuggestions;
