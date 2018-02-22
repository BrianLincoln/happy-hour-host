import React, { Component } from 'react';
import Filter from './../../../components/Filter/';
import Map from './../../../components/Map/';
import LocationsList from './../../../components/Locations/LocationsList';
import timeValues from './../../../utils/TimeValues';
import locationFilter from './../../../utils/LocationFilter';
import './MapSection.scss';
import _ from 'lodash';

export class HomepageMapSection extends Component {
  constructor(props) {
    super(props);
    this.setLocations = this.setLocations.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.handleLocationDeselect = this.handleLocationDeselect.bind(this);
    this.onMapUpdate = this.onMapUpdate.bind(this);
    this.updateActiveDays = this.updateActiveDays.bind(this);
    this.updateActiveTime = this.updateActiveTime.bind(this);

    this.state = {
      locations: [],
      selectedLocation: null,
      updateCount: 0,
      filters: {
        days: [],
        time: {value: "any"}
      },
      bounds: [],
      initialMapCenter: {
        lat: 44.948933,
        lng: -93.2998411
      },
      initialZoom: 15,
      hasSetLocations: false
    }
  }
  setLocations() {
    if (!this.props.fetchingLocations && this.props.locations.length > 0) {  
      let filteredLocations = locationFilter.filter(this.props.locations, this.state.bounds, this.state.filters);                      

      //Pass initial locations up to parent
      if (!this.state.hasSetLocations) {
        this.props.setNeighborhoodLocations(filteredLocations);
      }
        
      this.setState({locations: filteredLocations, hasSetLocations: true});
    }
  } 
  handleLocationSelect(locationId) {
    this.setState({selectedLocation: locationId || null});
  }
  handleLocationDeselect() {
    this.setState({selectedLocation: null});
  }
  onMapUpdate(bounds) {
    this.setState({bounds: bounds}, () => {
        this.setLocations();
    });
  } 
  updateActiveDays(activeDays) {
    let filters = {
      days: activeDays,
      time: this.state.filters.time
    }
    this.setState({filters: filters}, () => {
        this.setLocations();
    });
  }

  updateActiveTime(timeValue) {
    const time = _.find(timeValues, {value: timeValue});
    let filters = {
      days: this.state.filters.days,
      time: time
    }
    this.setState({filters: filters}, () => {
        this.setLocations();
    });
  }

  render() {
    return (
      <div className="map-search-container">
        <Map 
            centerAroundCurrentLocation={false}
            locations={this.state.locations} 
            onMapUpdate={this.onMapUpdate} 
            google={this.props.googleMapsApiKey} 
            initialMapCenter={this.state.initialMapCenter} 
            initialZoom={this.state.initialZoom}
            handleLocationSelect={this.handleLocationSelect}
            handleLocationDeselect = {this.handleLocationDeselect}
            selectedLocation = {this.state.selectedLocation} />

        <div className="map-results-wrapper">
            {this.state.selectedLocation 
              ? <button onClick={this.handleLocationDeselect} className="map-results-back font-sm" >{"back to results"}</button> 
              : <Filter 
                updateActiveDays={this.updateActiveDays} 
                activeDays={this.state.filters.days} 
                timeValues={timeValues} 
                updateActiveTime={this.updateActiveTime}
                activeTime={this.state.filters.time}  />
            }   
            <LocationsList 
              activeDays={this.state.filters.days} 
              activeTime={this.state.filters.time} 
              timeValues={timeValues} 
              updateActiveDays={this.updateActiveDays} 
              updateActiveTime={this.updateActiveTime} 
              locations={this.state.locations} 
              fetchingLocations={this.props.fetchingLocations}
              handleLocationDeselect = {this.handleLocationDeselect}
              selectedLocation = {this.state.selectedLocation} />  
            </div>                           
      </div>
    )
  }
}

export default HomepageMapSection;