import React, { Component } from 'react';
import locationFilter from './../../utils/LocationFilter';
import cityApi from './../../utils/CityApi';
import locationApi from './../../utils/LocationApi';
import MapSection from './MapSection/';
import LocationListItem from './../../components/Locations/LocationListItem';

class Neighborhood extends Component {
    
    constructor(props) {
        super(props);
        this.fetchNeighborhood = this.fetchNeighborhood.bind(this);
        this.fetchLocations = this.fetchLocations.bind(this);
        this.setNeighborhoodLocations = this.setNeighborhoodLocations.bind(this);

        this.state = {
            neighborhood: this.props.neighborhood ? this.props.neighborhood : null,
            neighborhoodLocations: [],
            locations: this.props.locations ? this.props.locations : []
        };

        if (!this.props.neighborhood) {
            this.fetchNeighborhood(this.props.cityName, this.props.neighborhoodName);
        }
        if (!this.props.locations) {
            this.fetchLocations();
        }
    }

    componentDidMount() {
        if (this.state.locations &&  this.state.neighborhood) {
            this.setNeighborhoodLocations(this.state.locations, this.state.neighborhood.mapPoly);
        }
    }

    fetchNeighborhood(cityName, neighborhoodName) {
        cityApi.getNeighborhoodByDisplayNames(cityName, neighborhoodName).then((result) => {
          if (result.success) {
            this.setState({neighborhood: result.neighborhood}, () => {                
                this.setNeighborhoodLocations(this.state.locations, this.state.neighborhood.mapPoly);
            });
          }
        });
    }  

    fetchLocations() {
        locationApi.getLocations().then((locations) => {
            this.setState({locations: locations}, () => {                
                this.setNeighborhoodLocations(this.state.locations, this.state.neighborhood.mapPoly);
            });   
        });    
    }      

    setNeighborhoodLocations(locations, mapPoly) {
        if (this.state.neighborhoodLocations.length === 0) {
            let filteredLocations = locationFilter.filterByMapPoly(locations, mapPoly);
            this.setState({neighborhoodLocations: filteredLocations});
        }
    }

    render() {
        if (!this.state.neighborhood) {
            return <div className="spinner"></div>
        } else  {    
            let neighborhoodLocations = this.state.neighborhoodLocations.map((location) => {
                return <LocationListItem key={location._id} {...location} />;
            });

            return (      
                <div>
                    <MapSection locations={this.state.locations} fetchingLocations={this.props.fetchingLocations} google={this.props.config.googleMapsApiKey} />                
                    <section className="background-valencia">
                        <div className="container space-bottom-xl space-top-xl">
                            <h1 className="align-center space-bottom-xl">All Happy Hours in {this.state.neighborhood.name}, {this.props.cityName}</h1>
                            {neighborhoodLocations}
                        </div>
                    </section>
                </div>
            );
        }
    }
  }
  
  export default Neighborhood;