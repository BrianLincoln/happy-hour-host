import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NeighborhoodList extends Component {
    render() {   
        console.log("NeighborhoodList: ", this.props);
        let neighborhoods = this.props.city.neighborhoods.map((neighborhood) => { 
            console.log(neighborhood);
            let path = `/${this.props.city.name}/${neighborhood.name}`;
            path = path.replace(" ", "+");
            return (
                <Link key={neighborhood._id} to={{
                    pathname: path, 
                    state: {
                        locations: this.props.locations, 
                        fetchingLocations: this.props.fetchingLocations,
                        neighborhood: neighborhood
                        }
                    }}>
                    {neighborhood.name}
                </Link>            
            );
        });        
        return (      
            <ul>
                {neighborhoods}
            </ul>
        );
    }
  }
  
  export default NeighborhoodList;