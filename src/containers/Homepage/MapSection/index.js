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

    const now = new Date();
    const today = now.getDay();
    let hours = now.getHours();
    let activeTime;

    if (hours < 5) {
      hours += 24;//hacky way of dealing with times passed midnight
    }
    timeValues.forEach((time) => {
      if (hours >= time.start && hours < time.end) {
        activeTime = time;
      } 
    });

    this.state = {
      locations: [],
      selectedLocation: null,
      updateCount: 0,
      filters: {
        days: [today],
        time: activeTime
      },
      bounds: [],
      initialMapCenter: {
        lat: 44.9778,
        lng: -93.2650
      },
      initialZoom: 13
    }
  }  
  setLocations() {
    if (!this.props.fetchingData && this.props.locations.length > 0) {  
      let filteredLocations = locationFilter.filter(this.props.locations, this.state.bounds, this.state.filters);          
      this.setState({locations: filteredLocations});
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
      days: activeDays || [],
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
            centerAroundCurrentLocation={true}
            locations={this.state.locations} 
            onMapUpdate={this.onMapUpdate} 
            google={this.props.googleMapsApiKey} 
            initialMapCenter={this.state.initialMapCenter} 
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
              cityName={this.props.cityName}
              timeValues={timeValues} 
              updateActiveDays={this.updateActiveDays} 
              updateActiveTime={this.updateActiveTime} 
              locations={this.state.locations} 
              fetchingData={this.props.fetchingData}
              handleLocationDeselect = {this.handleLocationDeselect}
              selectedLocation = {this.state.selectedLocation} />  
            </div>                           
      </div>
    )
  }
}

export default HomepageMapSection;