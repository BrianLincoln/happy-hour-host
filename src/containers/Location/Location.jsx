import React, { Component } from 'react';
import PropTypes from 'prop-types';
import locationApi from '../../utils/LocationApi';
import Special from '../../components/Special/Special';
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
    const { location } = this.props;

    if (location) {
      this.setState({
        ...location,
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
    const {
      name, city,
    } = this.state;

    document.title = `${name} Happy Hour - Food & Drink Specials in ${
      city.name
    }`;
  }

  fetchLocation() {
    const { locationId } = this.props;

    locationApi.getLocation(locationId).then((result) => {
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
    const {
      fetchingLocation,
      specials,
      website,
      googleMapLink,
      name,
      city,
    } = this.state;

    if (fetchingLocation) {
      return <div className="spinner" />;
    }

    const specialComponents = specials
      ? specials.map(special => <Special key={special._id} {...special} />)
      : null;

    const websiteLinkComponent = website ? (
      <a className="location-meta-link" href={website}>
        <div className="location-meta-link-icon">
          <i className=" fa fa-globe-americas" aria-hidden="true" />
        </div>
        <span className="font-base-alt">website</span>
      </a>
    ) : null;

    const googleMapLinkComponent = googleMapLink ? (
      <a className="location-meta-link" href={googleMapLink}>
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
            <h1 className="space-top-xl">{name}</h1>
            <h3 className="space-bottom-md">in {city.name}</h3>
            <div className="space-bottom-xl">
              {websiteLinkComponent}
              {googleMapLinkComponent}
            </div>
          </div>
        </div>
        <div>
          <div className="container">
            <h2 className="location-section-header space-bottom-md">
              All Food and Drink Specials
            </h2>
            <div className="special-list">{specialComponents}</div>
          </div>
        </div>
      </div>
    );
  }
}

Location.defaultProps = defaultProps;
Location.propTypes = propTypes;

export default Location;
