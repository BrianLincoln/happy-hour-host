import React, { Component } from 'react';
import PropTypes from 'prop-types';
import locationApi from './../../utils/LocationApi';
import Special from './../../components/Special/Special';
import pathHelpers from './../../utils/PathHelpers';
import './Location.scss';

const propTypes = {
  locationName: PropTypes.string.isRequired,
  location: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const defaultProps = {
  location: undefined,
};

class Location extends Component {
  constructor(props) {
    super(props);

    console.log('LOCATION : ', props);
    this.fetchLocation = this.fetchLocation.bind(this);
    this.setDocumentTitle = this.setDocumentTitle.bind(this);
    this.checkUrl = this.checkUrl.bind(this);
    this.state = {};
  }

  componentWillMount() {
    if (this.props.location) {
      this.setState({
        ...this.props.location,
      },
      () => {
        this.checkUrl();
        this.setDocumentTitle();
      });
    } else {
      this.fetchLocation();
    }
  }

  setDocumentTitle() {
    document.title = `${
      this.state.name
    } Happy Hour - Food & Drink Specials in ${this.state.city.name}`;
  }

  fetchLocation() {
    let decodedLocationName = this.props.locationName;
    decodedLocationName = decodedLocationName.replace(/\+/g, '%20'); // '1%20%2B%201%20%3D%202'
    decodedLocationName = decodeURIComponent(decodedLocationName); // '1 + 1 = 2'

    locationApi.getLocation(decodedLocationName).then((result) => {
      if (result.success) {
        this.setState({
          ...result.location,
        },
        () => {
          console.log(this.state);
          this.checkUrl();
          this.setDocumentTitle();
        });
      }
    });
  }

  checkUrl() {
    const fullPath = pathHelpers.locationPath(
      this.state._id,
      this.state.city.name,
      this.state.name
    );

    if (window.location.pathname !== fullPath) {
      pathHelpers.redirectPage(fullPath);
    }
  }

  render() {
    if (this.state === null) {
      return <h1>Loading...</h1>;
    } else if (this.state.notFound) {
      return <h1>Huh... could not find a matching location</h1>;
    }

    const specials = this.state.specials
      ? this.state.specials.map(special => (
        <Special key={special._id} {...special} />
      ))
      : null;

    const websiteLink = this.state.website ? (
      <a className="location-meta-link" href={this.state.website}>
        <i className="location-meta-link-icon fa fa-globe" aria-hidden="true" />
        <span className="font-sm">website</span>
      </a>
    ) : null;

    const googleMapLink = this.state.googleMapLink ? (
      <a className="location-meta-link" href={this.state.googleMapLink}>
        <i
          className="location-meta-link-icon fa fa-map-marker"
          aria-hidden="true"
        />
        <span className="font-sm">directions</span>
      </a>
    ) : null;

    return (
      <div className="container">
        <div className="location row">
          <div className="col-xs-12 col-md-6 col-xl-8">
            <h1 className="location-name">{this.state.name}</h1>
            {websiteLink}
            {googleMapLink}
          </div>
          <div className="col-xs-12 col-md-6 col-xl-4">
            <ul className="special-list">{specials}</ul>
          </div>
        </div>
      </div>
    );
  }
}

Location.defaultProps = defaultProps;
Location.propTypes = propTypes;

export default Location;
