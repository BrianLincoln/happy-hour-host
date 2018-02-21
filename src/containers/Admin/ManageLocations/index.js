import React, { Component } from 'react';
import SelectCity from './SelectCity';
import LocationForm from './LocationForm';
import LocationListItem from './LocationListItem';
import cityApi from './../../../utils/CityApi';
import locationApi from './../../../utils/LocationApi';

export class Locations extends Component {
    constructor(props) {
        super(props);
        this.fetchCities = this.fetchCities.bind(this);
        this.handleCitySelect = this.handleCitySelect.bind(this);
        this.handleSubmitNewLocation = this.handleSubmitNewLocation.bind(this);
        this.toggleAddLocationForm = this.toggleAddLocationForm.bind(this);
        this.fetchLocations = this.fetchLocations.bind(this);
        this.deleteLocation = this.deleteLocation.bind(this);
        this.getLocationById = this.getLocationById.bind(this);

        this.state = {
            city: null,
            locations: [],
            showAddLocationForm: false
        };

        this.fetchCities();
    }    
    fetchCities() {
        cityApi.getCities().then((result) => {
            if (result.success) {
            this.setState({cities: result.cities});
            }
        });
    } 
    handleCitySelect(city) {
        this.setState({city: city}, () => {
            this.fetchLocations();            
        });  
    }
    handleSubmitNewLocation(location) {
        locationApi.postLocation(location, this.state.city).then((results) => {
            this.fetchLocations();
            this.toggleAddLocationForm();
        });        
    }
    toggleAddLocationForm() {
        this.setState({showAddLocationForm: !this.state.showAddLocationForm});
    }
    fetchLocations() {
        if (this.state.city) {
            locationApi.getLocationsByCity(this.state.city).then((locations) => {
                this.setState({locations: locations});
            });
        } else {
            this.setState({locations: []});
        }
    }
    deleteLocation(locationId) {
        locationApi.deleteLocation(locationId).then(() => {
            this.fetchLocations();
        });         
    }
    getLocationById(locationId, suppliedLocations) {
        const locations = suppliedLocations ? suppliedLocations : this.state.locations;        
        const result = locations.filter(function( location ) {
            return location._id === locationId;
        });
        return result.length > 0 ? result[0] : null;
    }
    render() {
        if (!this.state.cities) {
            return <div className="spinner"></div>
          } else  {
            const locations = !this.state.locations ? null : this.state.locations.map((location) => {
                return <LocationListItem location={location} deleteLocation={this.deleteLocation} />
            });

            if (this.state.city) {
                return (
                    <div className="card">
                        <a className="button_sm .button_transparent" href="/admin"><i className="fas fa-arrow-left"></i> back</a>
                        <h1>Locations</h1>
                        <SelectCity cities={this.state.cities} handleCitySelect={this.handleCitySelect} />
                        {this.state.showAddLocationForm 
                            ? <LocationForm mode="new" handleCancel={this.toggleAddLocationForm} handleSubmitNewLocation={this.handleSubmitNewLocation} /> 
                            : <button className="button_sm button_curious" onClick={this.toggleAddLocationForm}>Add Location</button>}
                        <div className="list-group admin-location-list">
                            {locations}
                        </div>                
                    </div>
                )                
            } else {
                return (
                    <div className="card">                    
                        <a className="button_sm .button_transparent" href="/admin"><i className="fas fa-arrow-left"></i> back</a>
                        <h1>Select a city</h1>
                        {this.state.cities ? <SelectCity cities={this.state.cities} handleCitySelect={this.handleCitySelect} /> : null}
                    </div>
                );
            }            
        }
    }
}

export default Locations;