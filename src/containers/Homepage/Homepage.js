import React, { Component } from 'react';
import './Homepage.scss';
import MapSection from './../../components/MapSection/MapSection.js';
import NeighborhoodList from './../../components/Neighborhoods/NeighborhoodList';
import locationApi from './../../utils/LocationApi';

export class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {      
      locations: [],
      fetchingLocations: true,
    }
    this.fetchLocations = this.fetchLocations.bind(this);

    this.fetchLocations();
  }
  fetchLocations() {
    locationApi.getLocations().then((locations) => {
      this.setState({locations: locations, fetchingLocations: false});    
    });    
  }   
  render() {
    console.log("homepage locations: ", this.state.locations);
    return (
      <div>
        <MapSection locations={this.state.locations} fetchingLocations={this.state.fetchingLocations} google={this.props.config.googleMapsApiKey} />
        <section className="homepage-categories">
          <div className="container">
            <h1>Find the best food and drink specials in Minneapolis</h1>
            <div className="row">
              <div className="col-xs-12 col-sm-6 homepage-category">
                <h2>Happy Hours By Neighborhood</h2>
                <NeighborhoodList />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Homepage;