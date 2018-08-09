import React, { Component } from 'react';
import PropTypes from 'prop-types';
import locationApi from './../../utils/LocationApi';
import Special from './../../components/Special/Special';
import './Location.scss';

const propTypes = {
  locationId: PropTypes.string.isRequired,
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

    this.fetchLocation = this.fetchLocation.bind(this);
    this.setDocumentTitle = this.setDocumentTitle.bind(this);
  }

  componentWillMount() {
    if (this.props.location) {
      this.setState({
        ...this.props.location,
      },
      () => {
        this.setDocumentTitle();
      });
    } else {
      this.setState({
        fetchingLocation: true,
      });

      this.fetchLocation();
    }
  }

  setDocumentTitle() {
    document.title = `${
      this.state.name
    } Happy Hour - Food & Drink Specials in ${this.state.city.name}`;
  }

  fetchLocation() {
    locationApi.getLocation(this.props.locationId).then((result) => {
      if (result.success) {
        this.setState({
          ...result.location,
          fetchingLocation: false,
        },
        () => {
          this.setDocumentTitle();
        });
      }
    });
  }

  render() {
    if (this.state.fetchingLocation) {
      return <div className="spinner" />;
    }

    const specials = this.state.specials
      ? this.state.specials.map(special => (
        <Special key={special._id} {...special} />
      ))
      : null;

    const websiteLink = this.state.website ? (
      <a className="location-meta-link" href={this.state.website}>
        <div className="location-meta-link-icon">
          <i className=" fa fa-globe-americas" aria-hidden="true" />
        </div>
        <span className="font-base-alt">website</span>
      </a>
    ) : null;

    const googleMapLink = this.state.googleMapLink ? (
      <a className="location-meta-link" href={this.state.googleMapLink}>
        <div className="location-meta-link-icon">
          <i className="fa fa-map-marker-alt" aria-hidden="true" />
        </div>
        <span className="font-base-alt">directions</span>
      </a>
    ) : null;

    return (
      <div>
        <div className="bg-white">
          <div className="container space-bottom-xl">
            <h1 className="space-top-xl">{this.state.name}</h1>
            <h3 className="space-bottom-md">in {this.state.city.name}</h3>
            <div className="space-bottom-xl">
              {websiteLink}
              {googleMapLink}
            </div>
          </div>
        </div>
        <div>
          <div className="container">
            <h2 className="location-section-header space-bottom-md">
              All Food and Drink Specials
            </h2>
            <div className="special-list">{specials}</div>
          </div>
        </div>
      </div>
    );
  }
}

Location.defaultProps = defaultProps;
Location.propTypes = propTypes;

export default Location;
