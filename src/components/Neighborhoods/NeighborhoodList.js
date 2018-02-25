import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NeighborhoodList.scss';

class NeighborhoodList extends Component {
    render() {
        let neighborhoods = null;

        if (this.props.fetchingData) {
            neighborhoods = <div className="spinner"></div>;
        } else {
            neighborhoods = this.props.city.neighborhoods.map((neighborhood) => { 
                let path = `/${this.props.city.name}/neighborhood/${neighborhood.name}`;
                path = path.replace(" ", "+");
                return (
                    <Link className="neighborhood-list-item"
                        key={neighborhood._id} to={{
                        pathname: path, 
                        state: {
                                cityName: this.props.cityName,
                                locations: this.props.locations, 
                                neighborhood: neighborhood
                            }
                        }}>
                        {neighborhood.name}
                    </Link>            
                );
            }); 
        }
               
        return (      
            <ul>
                {neighborhoods}
            </ul>
        );
    }
  }
  
  export default NeighborhoodList;