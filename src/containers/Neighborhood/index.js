import React, { Component } from 'react';
import MapSection from './MapSection/';
import LocationListItem from './../../components/Locations/LocationListItem';

class Neighborhood extends Component {
    
    constructor(props) {
        super(props);
        this.setNeighborhoodLocations = this.setNeighborhoodLocations.bind(this);

        this.state = {
            locations: [],
        };
    }

    setNeighborhoodLocations(locations) {
        if (this.state.locations.length === 0) {
            this.setState({locations: locations});
        }
    }

    render() {         
        let locations = this.state.locations.map((location) => {
            return <LocationListItem key={location._id} {...location} />;
        });

        return (      
            <div>
                <MapSection setNeighborhoodLocations={this.setNeighborhoodLocations} locations={this.props.locations} fetchingLocations={this.props.fetchingLocations} google={this.props.config.googleMapsApiKey} />                
                <section className="background-valencia">
                    <div className="container space-bottom-xl space-top-xl">
                        <h1 className="align-center space-bottom-xl">All Happy Hours in {this.props.neighborhood.name}, {this.props.cityName}</h1>
                        {locations}
                    </div>
                </section>
            </div>
        );
    }
  }
  
  export default Neighborhood;