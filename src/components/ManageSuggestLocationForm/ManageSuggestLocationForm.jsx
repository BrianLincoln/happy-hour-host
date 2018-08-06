import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
  })).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export class ManageSuggestLocationForm extends Component {
  constructor(props) {
    super(props);

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      city: '',
      name: '',
      website: '',
      googleMapLink: '',
      source: '',
    };
  }

  handleFieldChange(event) {
    switch (event.target.id) {
      case 'city':
        this.setState({
          city: event.target.value,
        });
        break;
      case 'location-name':
        this.setState({
          name: event.target.value,
        });
        break;
      case 'website':
        this.setState({
          website: event.target.value,
        });
        break;
      case 'googleMapLink':
        this.setState({
          googleMapLink: event.target.value,
        });
        break;
      case 'source':
        this.setState({
          source: event.target.value,
        });
        break;

      // no default
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state);
  }

  render() {
    const cities = this.props.cities.map(city => (
      <option key={city._id} value={city._id}>
        {city.name}
      </option>
    ));

    return (
      <form
        className="form-group space-top-xl space-bottom-sm row"
        onSubmit={this.handleSubmit}
      >
        <div className="card col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
          <div className="card-heading">Suggest Location</div>
          <div className="form-element">
            <label className="font-title-sm form-label" htmlFor="city">
              City:
              <select
                required
                value={this.state.city || ''}
                id="city"
                onChange={this.handleFieldChange}
              >
                <option value="" disabled />

                {cities}
              </select>
            </label>
          </div>
          <div className="form-element">
            <label className="font-title-sm form-label" htmlFor="location-name">
              Name:
              <input
                placeholder="Tracy's Saloon"
                required
                type="text"
                id="location-name"
                value={this.state.name}
                onChange={this.handleFieldChange}
              />
            </label>
          </div>
          <div className="form-element">
            <label className="font-title-sm form-label" htmlFor="website">
              Website:
              <input
                placeholder="http://www.tracyssaloon.com"
                type="text"
                id="website"
                value={this.state.website}
                onChange={this.handleFieldChange}
              />
            </label>
          </div>
          <div className="form-element">
            <label className="font-title-sm form-label" htmlFor="googleMapLink">
              Google Map Link:
              <input
                placeholder="https://goo.gl/maps/xFjjXArpZR82"
                type="text"
                id="googleMapLink"
                value={this.state.googleMapLink}
                onChange={this.handleFieldChange}
              />
            </label>
          </div>
          <div className="form-element">
            <label className="font-title-sm form-label" htmlFor="source">
              <div className="source-explanation">
                A link to their specials:
                <input
                  placeholder="http://www.tracyssaloon.com/specials.html"
                  type="text"
                  id="source"
                  value={this.state.source}
                  onChange={this.handleFieldChange}
                />
                <p className="space-top-md">
                  {' '}
                  This could come from anywhere. <br />Some examples:
                </p>
                <ul>
                  <li>
                    A link to a specific page on their website (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://www.tracyssaloon.com/specials.html"
                    >
                      example
                    </a>)
                  </li>
                  <li>
                    A picture of a physical menu, uploaded to{' '}
                    <a href="https://imgur.com">an image hosting site</a> (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://imgur.com/a5P4Uji"
                    >
                      example
                    </a>)
                  </li>
                </ul>
              </div>
            </label>{' '}
          </div>
          <div className="button-group">
            <input
              className="button_sm button_curious"
              type="submit"
              value="Submit"
            />
          </div>
        </div>
      </form>
    );
  }
}

ManageSuggestLocationForm.propTypes = propTypes;

export default ManageSuggestLocationForm;