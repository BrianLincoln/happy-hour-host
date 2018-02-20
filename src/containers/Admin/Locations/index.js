import React, { Component } from 'react';
import './Locations.scss';
import SelectCity from './SelectCity';
import LocationForm from './LocationForm';
import Location from './Location';
import LocationDetails from './Location/LocationDetails';
import locationApi from './../../../utils/LocationApi';

export class Locations extends Component {
    constructor(props) {
        super(props);
        this.handleCitySelect = this.handleCitySelect.bind(this);
        this.handleSubmitNewLocation = this.handleSubmitNewLocation.bind(this);
        this.toggleAddLocationForm = this.toggleAddLocationForm.bind(this);
        this.fetchLocations = this.fetchLocations.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
        this.unselectLocation = this.unselectLocation.bind(this);
        this.deleteLocation = this.deleteLocation.bind(this);
        this.handleSubmitUpdateLocation = this.handleSubmitUpdateLocation.bind(this);
        this.getLocationById = this.getLocationById.bind(this);

        this.state = {
            city: null,
            locations: [],
            showAddLocationForm: false,
            selectedLocation: null
        };
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
    handleSubmitUpdateLocation(location) {
        locationApi.updateLocation(location).then((results) => {
            this.fetchLocations(location._id);
        });      
    }
    toggleAddLocationForm() {
        this.setState({showAddLocationForm: !this.state.showAddLocationForm});
    }
    fetchLocations(selectedLocationId) {
        if (this.state.city) {
            locationApi.getLocationsByCity(this.state.city).then((locations) => {
                const selectedLocation = selectedLocationId ? this.getLocationById(selectedLocationId, locations) : null;
                this.setState({locations: locations, selectedLocation: selectedLocation ? selectedLocation : null});
            });
        } else {
            this.setState({locations: []});
        }
    }
    handleLocationClick(location) {
        this.setState({selectedLocation: location});
    }
    unselectLocation() {
        this.setState({selectedLocation: null});
    }
    deleteLocation(location) {
        locationApi.deleteLocation(location).then(() => {
            this.fetchLocations();
        }).then(() => {
            this.setState({selectedLocation: null});  
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
        const locations = !this.state.locations ? null : this.state.locations.map((location) => {
            return (<Location handleLocationClick={this.handleLocationClick} key={location._id} location={location} fetchLocations={this.fetchLocations} /> );
        });

        if (this.state.city) {
            if (this.state.selectedLocation) {
                return (
                    <LocationDetails location={this.state.selectedLocation} deleteLocation={this.deleteLocation} unselectLocation={this.unselectLocation} updateLocation={this.handleSubmitUpdateLocation} fetchLocations={this.fetchLocations} />
                )
            } else {
                return (
                    <div className="card">
                        <h1>Locations</h1>
                        <SelectCity {...this.props} handleCitySelect={this.handleCitySelect} />
                        {this.state.showAddLocationForm 
                            ? <LocationForm mode="new" handleCancel={this.toggleAddLocationForm} handleSubmitNewLocation={this.handleSubmitNewLocation} /> 
                            : <button className="button_sm button_curious" onClick={this.toggleAddLocationForm}>Add Location</button>}
                        <div className="list-group admin-location-list">
                            {locations}
                        </div>                
                    </div>
                )
            }
        } else {
            return (
                <div className="card">
                    <h1>Select a city</h1>
                    {this.props.cities ? <SelectCity {...this.props} handleCitySelect={this.handleCitySelect} /> : null}
                </div>
            );
        }


    }
}

export default Locations;