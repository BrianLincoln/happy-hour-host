import React from 'react';
import PropTypes from 'prop-types';
import cache from '../../utils/ScriptCache';
import GoogleApi from '../../utils/GoogleApi';

const propTypes = {
  initialZoom: PropTypes.number.isRequired,
  initialMapCenter: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
};

const defaultMapConfig = {};
export const wrapper = options => (WrappedComponent) => {
  const { apiKey } = options;
  const libraries = options.libraries || ['places'];

  class Wrapper extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        loaded: false,
        map: null,
        google: null,
      };
    }

    componentWillMount() {
      this.scriptCache = cache({
        google: GoogleApi({
          apiKey,
          libraries,
        }),
      });
    }

    componentDidMount() {
      const {
        initialMapCenter, initialZoom,
      } = this.props;

      this.scriptCache.google.onLoad(() => {
        const { maps } = window.google;
        const center = new maps.LatLng(initialMapCenter.lat,
          initialMapCenter.lng);
        const mapConfig = Object.assign(
          {}, defaultMapConfig, {
            center,
            zoom: initialZoom,
          }
        );

        this.map = new maps.Map(this.mapRef, mapConfig);

        this.setState({
          loaded: true,
          map: this.map,
          google: window.google,
        });
      });
    }

    render() {
      const {
        loaded, map, google,
      } = this.state;
      const props = Object.assign(
        {}, this.props, {
          loaded,
          map,
          google,
          mapComponent: this.mapRef,
        }
      );

      return (
        <div className="map">
          <WrappedComponent {...props} />
          <div
            ref={(mapElement) => {
              this.mapRef = mapElement;
            }}
          />
        </div>
      );
    }
  }

  Wrapper.propTypes = propTypes;

  return Wrapper;
};

export default wrapper;
