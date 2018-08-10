import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cityApi from '../../utils/CityApi';

const propTypes = {
  cityId: PropTypes.string.isRequired,
  neighborhoodId: PropTypes.string.isRequired,
};

export class Neighborhoods extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.fetchNeighborhood = this.fetchNeighborhood.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);

    this.fetchNeighborhood();
  }

  fetchNeighborhood(showUpdateSuccess) {
    const {
      cityId, neighborhoodId,
    } = this.props;

    cityApi.getNeighborhood(cityId, neighborhoodId).then((result) => {
      if (result.success) {
        this.setState({
          neighborhood: result.neighborhood,
          showUpdateSuccess,
          nameField: result.neighborhood.name || '',
          mapCenterLatitudeField: result.neighborhood.mapCenter.latitude || '',
          mapCenterLongitudeField:
            result.neighborhood.mapCenter.longitude || '',
          mapZoomLevelField: result.neighborhood.mapZoomLevel || 0,
          polyField: JSON.stringify(result.neighborhood.mapPoly) || '',
        });
      }
    });
  }

  handleFieldChange(event) {
    switch (event.target.id) {
      case 'name':
        this.setState({
          nameField: event.target.value,
        });
        break;
      case 'mapCenterLatitudeField':
        this.setState({
          mapCenterLatitudeField: event.target.value,
        });
        break;
      case 'mapCenterLongitudeField':
        this.setState({
          mapCenterLongitudeField: event.target.value,
        });
        break;
      case 'mapZoomLevel':
        this.setState({
          mapZoomLevelField: event.target.value,
        });
        break;
      case 'poly':
        this.setState({
          polyField: event.target.value,
        });
        break;

      // no default
    }
  }

  handleSubmitForm(event) {
    event.preventDefault();

    const {
      nameField,
      mapCenterLatitudeField,
      mapCenterLongitudeField,
      mapZoomLevelField,
      polyField,
    } = this.state;

    const {
      cityId, neighborhoodId,
    } = this.props;

    const updatedNeighborhood = {
      name: nameField,
      mapCenter: {
        latitude: mapCenterLatitudeField,
        longitude: mapCenterLongitudeField,
      },
      mapZoomLevel: mapZoomLevelField,
      mapPoly: JSON.parse(polyField),
    };

    cityApi
      .updateNeighborhood(
        updatedNeighborhood, cityId, neighborhoodId
      )
      .then(() => {
        window.location.href = `/admin/city/${cityId}`;
      });
  }

  render() {
    const {
      neighborhood,
      showUpdateSuccess,
      nameField,
      mapCenterLatitudeField,
      mapCenterLongitudeField,
      mapZoomLevelField,
      polyField,
    } = this.state;
    const { cityId } = this.props;

    if (!neighborhood) {
      return <div className="spinner" />;
    }

    const updateSuccessMessage = showUpdateSuccess ? (
      <h3 className="color-curious">
        <i className="fas fa-check-circle" /> updated
      </h3>
    ) : null;

    return (
      <div className="container">
        <div className="admin-neighborhood">
          <a
            className="button_sm .button_transparent"
            href={`/admin/city/${cityId}`}
          >
            <i className="fas fa-arrow-left" /> back
          </a>
          <h1>{neighborhood.name}</h1>
          <form
            className=" form-group space-top-sm space-bottom-sm"
            onSubmit={this.handleSubmitForm}
          >
            <div className="form-element">
              <label className="form-label" htmlFor="name">
                name
                <input
                  onChange={this.handleFieldChange}
                  required
                  id="name"
                  type="text"
                  value={nameField}
                />
              </label>
            </div>
            <div className="form-element">
              <label className="form-label" htmlFor="mapCenterLatitudeField">
                mapCenterLatitudeField
                <input
                  onChange={this.handleFieldChange}
                  required
                  id="mapCenterLatitudeField"
                  type="text"
                  value={mapCenterLatitudeField}
                />
              </label>
            </div>
            <div className="form-element">
              <label className="form-label" htmlFor="mapCenterLongitudeField">
                mapCenterLongitude
                <input
                  onChange={this.handleFieldChange}
                  required
                  id="mapCenterLongitudeField"
                  type="text"
                  value={mapCenterLongitudeField}
                />
              </label>
            </div>
            <div className="form-element">
              <label className="form-label" htmlFor="mapZoomLevel">
                map Zoom Level
                <input
                  onChange={this.handleFieldChange}
                  required
                  id="mapZoomLevel"
                  type="number"
                  value={mapZoomLevelField}
                />
              </label>
            </div>
            <div className="form-element">
              <label className="form-label" htmlFor="poly">
                poly
                <input
                  onChange={this.handleFieldChange}
                  required
                  id="poly"
                  type="text"
                  value={polyField}
                />
              </label>
              <div className="color-medium">
                like this:
                [[-93.306181,44.9635469],[-93.3078117,44.9360903],[-93.2780285,44.9357258],[-93.2764835,44.9633647],[-93.306181,44.9635469]]{' '}
              </div>
              <div className="color-medium">
                from here:{' '}
                <a href="https://www.keene.edu/campus/maps/tool/">
                  https://www.keene.edu/campus/maps/tool/
                </a>{' '}
              </div>
            </div>
            {updateSuccessMessage}
            <div className="button-group button-group_left">
              <input
                className="button_sm button_curious"
                type="submit"
                value="update"
              />

              <a
                className="button_sm button_valencia"
                href={`/admin/city/${cityId}`}
              >
                cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Neighborhoods.propTypes = propTypes;

export default Neighborhoods;
