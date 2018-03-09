import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cityApi from './../../utils/CityApi';

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
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);

    this.fetchNeighborhood();
  }

  fetchNeighborhood(showUpdateSuccess) {
    cityApi.getNeighborhood(this.props.cityId, this.props.neighborhoodId).then((result) => {
      if (result.success) {
        this.setState({
          neighborhood: result.neighborhood,
          showUpdateSuccess,
          nameField: result.neighborhood.name || '',
          mapCenterLatitudeField: result.neighborhood.mapCenter.latitude || '',
          mapCenterLongitudeField: result.neighborhood.mapCenter.longitude || '',
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

    const updatedNeighborhood = {
      name: this.state.nameField,
      mapCenter: {
        latitude: this.state.mapCenterLatitudeField,
        longitude: this.state.mapCenterLongitudeField,
      },
      mapZoomLevel: this.state.mapZoomLevelField,
      mapPoly: JSON.parse(this.state.polyField),
    };

    cityApi
      .updateNeighborhood(
        updatedNeighborhood, this.props.cityId, this.props.neighborhoodId,
      )
      .then((result) => {
        const showUpdateSuccess = result.success;
        this.fetchNeighborhood(showUpdateSuccess);
      });
  }

  handleCancelButtonClick() {
    this.fetchNeighborhood();
  }

  render() {
    if (!this.state.neighborhood) {
      return <div className="spinner" />;
    }

    const updateSuccessMessage = this.state.showUpdateSuccess ? (
      <h3 className="color-curious">
        <i className="fas fa-check-circle" /> updated
      </h3>
    ) : null;

    return (
      <div className="container">
        <div className="admin-neighborhood">
          <a className="button_sm .button_transparent" href={`/admin/city/${this.props.cityId}`}>
            <i className="fas fa-arrow-left" /> back
          </a>
          <h1>{this.state.neighborhood.name}</h1>
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
                  value={this.state.nameField}
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
                  value={this.state.mapCenterLatitudeField}
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
                  value={this.state.mapCenterLongitudeField}
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
                  value={this.state.mapZoomLevelField}
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
                  value={this.state.polyField}
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
              <input className="button_sm button_curious" type="submit" value="update" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Neighborhoods.propTypes = propTypes;

export default Neighborhoods;
