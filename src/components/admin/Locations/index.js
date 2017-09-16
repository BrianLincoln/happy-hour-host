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
        this.getLocationsByCity = this.getLocationsByCity.bind(this);
        this.updateLocations = this.updateLocations.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
        this.unselectLocation = this.unselectLocation.bind(this);
        this.deleteLocation = this.deleteLocation.bind(this);

        this.state = {
            cityId: null,
            locations: [],
            showAddLocationForm: false,
            selectedLocation: null
        };
    }    
    handleCitySelect(cityId) {
        this.setState({cityId: cityId});
        this.getLocationsByCity(cityId);
    }
    handleSubmitNewLocation(location, cityId) {
        locationApi.postLocation(location, cityId).then((results) => {
            this.getLocationsByCity(cityId);
            this.toggleAddLocationForm();
        });        
    }
    toggleAddLocationForm() {
        this.setState({showAddLocationForm: !this.state.showAddLocationForm});
    }
    getLocationsByCity(cityId) {
        if (cityId) {
            locationApi.getLocationsByCity(cityId).then((locations) => {
                this.setState({locations: locations});
            });
        } else {
            this.setState({locations: []});
        }
    }
    updateLocations() {
        if (this.state.cityId) {
            this.getLocationsByCity(this.state.cityId);
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
            this.getLocationsByCity(this.state.scityId);
        }).then(() => {
            this.setState({selectedLocation: null});  
        });           
    }
    render() {
        const locations = !this.state.locations ? null : this.state.locations.map((location) => {
            return (<Location handleLocationClick={this.handleLocationClick} key={location._id} location={location} updateLocations={this.updateLocations} /> );
        });

        if (this.state.cityId) {
            if (this.state.selectedLocation) {
                return (
                    <LocationDetails deleteLocation={this.deleteLocation} unselectLocation={this.unselectLocation} updateLocations={this.updateLocations} {...this.state.selectedLocation} />
                )
            } else {
                return (
                    <div className="card">
                        <h1>Locations</h1>
                        <SelectCity {...this.props} handleCitySelect={this.handleCitySelect} />
                        {this.state.showAddLocationForm 
                            ? <LocationForm {...this.props} mode="new" cityId={this.state.cityId} handleCancel={this.toggleAddLocationForm} handleSubmitNewLocation={this.handleSubmitNewLocation} /> 
                            : <button onClick={this.toggleAddLocationForm}>Add Location</button>}
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