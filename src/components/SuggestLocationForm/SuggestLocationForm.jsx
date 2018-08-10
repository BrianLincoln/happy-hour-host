import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SuggestLocationForm.scss';

const propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
  })).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export class SuggestLocationForm extends Component {
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
    const { handleSubmit } = this.props;

    handleSubmit(this.state);
  }

  render() {
    const { cities } = this.props;
    const {
      city, name, website, googleMapLink, source,
    } = this.state;

    const citiesComponent = cities.map(c => (
      <option key={c._id} value={c._id}>
        {c.name}
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
                id="city"
                required
                value={city || ''}
                onChange={this.handleFieldChange}
              >
                <option value="" disabled />

                {citiesComponent}
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
                value={name}
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
                value={website}
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
                value={googleMapLink}
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
                  value={source}
                  onChange={this.handleFieldChange}
                />
                <p className="space-top-md">
                  {' '}
                  This could come from anywhere. <br />
                  Some examples:
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
                    </a>
                    )
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
                    </a>
                    )
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

SuggestLocationForm.propTypes = propTypes;

export default SuggestLocationForm;
