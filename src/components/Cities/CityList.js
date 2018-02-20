import React, { Component } from 'react';
import City from './City';

class CityList extends Component {
    render() {   
        let cities = this.props.cities.map((city) => {
            if (city.neighborhoods.length > 0) {
                return <City key={city._id} city={city} locations={this.props.locations} fetchingLocations={this.props.fetchingLocations} />
            }
        });

        return (                  
            <div>
                {cities}
            </div>
        );
    }
  }
  
  export default CityList;