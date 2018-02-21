import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NeighborhoodList extends Component {
    render() {   
        let neighborhoods = this.props.city.neighborhoods.map((neighborhood) => { 
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