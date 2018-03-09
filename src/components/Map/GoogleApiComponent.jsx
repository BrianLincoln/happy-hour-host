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
  const {
    apiKey,
  } = options;
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
      this.scriptCache.google.onLoad(() => {
        const {
          maps,
        } = window.google;
        const center = new maps.LatLng(this.props.initialMapCenter.lat,
          this.props.initialMapCenter.lng);
        const mapConfig = Object.assign(
          {}, defaultMapConfig, {
            center,
            zoom: this.props.initialZoom,
          },
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
      const props = Object.assign(
        {}, this.props, {
          loaded: this.state.loaded,
          map: this.state.map,
          google: this.state.google,
          mapComponent: this.mapRef,
        },
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
