import React, { Component } from 'react';
import cityApi from './../../../../utils/CityApi';

export class Neighborhoods extends Component {
  constructor(props) {
    super(props);

    this.state =  {}

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
          showUpdateSuccess: showUpdateSuccess,
          nameField: result.neighborhood.name || "",
          mapCenterLatitudeField: result.neighborhood.mapCenter.latitude || "x",
          mapCenterLongitudeField: result.neighborhood.mapCenter.longitude || "",
          mapZoomLevelField: result.neighborhood.mapZoomLevel || 0,
          polyField: result.neighborhood.mapPoly.toString() || "",
        });
      }
    });;
  }

  handleFieldChange(event) {
    switch (event.target.id) {
      case "name":
        this.setState({nameField: event.target.value});
        break;
      case "mapCenterLatitudeField":
        this.setState({mapCenterLatitudeField: event.target.value});
        break;
      case "mapCenterLongitudeField":
        this.setState({mapCenterLongitudeField: event.target.value});       
        break;
      case "mapZoomLevel":
        this.setState({mapZoomLevelField: event.target.value});    
          break;
      case "poly":
        this.setState({polyField: event.target.value});    
          break;
    }
  }

  handleSubmitForm(event) {
    event.preventDefault();

    let updatedNeighborhood = {
      name: this.state.nameField,
      mapCenter: {
        latitude: this.state.mapCenterYField,
        longitude: this.state.mapCenterLongitudeField
      },
      mapZoomLevel: this.state.mapZoomLevelField,
      mapPoly: this.state.polyField.split()
    }

    cityApi.updateNeighborhood(updatedNeighborhood, this.props.cityId, this.props.neighborhoodId).then((result) => {
      const showUpdateSuccess = result.success;      
      this.fetchNeighborhood(showUpdateSuccess);      
    });
  }

  handleCancelButtonClick() {
    this.fetchNeighborhood();
  }

  render() {
    if (!this.state.neighborhood) {
      return <div className="spinner"></div>
    } else  {   
      const updateSuccessMessage = this.state.showUpdateSuccess ? <h3 className="color-curious"><i className="fas fa-check-circle"></i> updated</h3> : null;

      return (
        <div className="container">
          <div className="admin-neighborhood">
            <h1>{this.state.neighborhood.name}</h1>
            <form className=" form-group space-top-sm space-bottom-sm" onSubmit={this.handleSubmitForm}>          

                <div className="form-element">
                  <label className="form-label" htmlFor="name">name</label>
                  <input onChange={this.handleFieldChange} required id="name" type="text" value={this.state.nameField} />                    
                </div>
                <div className="form-element">
                  <label className="form-label" htmlFor="mapCenterLatitudeField">mapCenterLatitudeField</label>
                  <input onChange={this.handleFieldChange} required id="mapCenterLatitudeField" type="text" value={this.state.mapCenterLatitudeField} />                    
                </div>
                <div className="form-element">
                  <label className="form-label" htmlFor="mapCenterLongitudeField">mapCenterLongitude</label>
                  <input onChange={this.handleFieldChange} required id="mapCenterLongitudeField" type="text" value={this.state.mapCenterLongitudeField} />                    
                </div>
                <div className="form-element">
                  <label className="form-label" htmlFor="mapZoomLevel">map Zoom Level</label>
                  <input onChange={this.handleFieldChange} required id="mapZoomLevel" type="number" value={this.state.mapZoomLevelField} />                    
                </div>
                <div className="form-element">
                  <label className="form-label" htmlFor="poly">poly</label>
                  <input onChange={this.handleFieldChange} required id="poly" type="text" value={this.state.polyField} />                    
                </div>
                {updateSuccessMessage}
                <div className="button-group button-group_left">
                  <input className="button_sm button_curious" type="submit" value="update" />
                  <button className="button_sm button_medium" onClick={this.handleCancelButtonClick}>cancel</button>                  
              </div>
            </form>
          </div>
        </div>
      )
    }
  }
}

export default Neighborhoods;