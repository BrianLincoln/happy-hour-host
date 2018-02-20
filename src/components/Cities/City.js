import React, { Component } from 'react';
import NeighborhoodList from '../Neighborhoods/NeighborhoodList';

class CityList extends Component {
    render() {   
        return (      
            <div>            
                <h1>Food and drink specials in Minneapolis</h1>
                <div className="row">
                    <div className="col-xs-12 col-sm-6 homepage-category">
                        <h2>Happy hours in your neighborhood</h2>
                        <NeighborhoodList city={this.props.city} locations={this.props.locations} fetchingLocations={this.props.fetchingLocations} />                        
                    </div>
                    <div className="col-xs-12 col-sm-6 homepage-category">
                        <h2>Happy hours every day of the week</h2>
                        <ul>
                            <li>monday</li>    
                            <li>etc</li>
                            <li>monday</li>
                            <li>etc</li>
                            <li>monday</li>
                        </ul>                   
                    </div>
                </div>                
            </div>
        );
    }
  }
  
  export default CityList;