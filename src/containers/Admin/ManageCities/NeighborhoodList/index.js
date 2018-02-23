import React, { Component } from 'react';
import NeighborhoodListItem from './../NeighborhoodListItem';
import cityApi from './../../../../utils/CityApi';

export class Neighborhoods extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      fetchNeighborhoods: this.props.fetchNeighborhoods,
      showAddNeighborhood: false
    }

    this.deleteNeighborhood = this.deleteNeighborhood.bind(this);
  }

  deleteNeighborhood(neighborHoodId) {
    cityApi.deleteNeighborhood(this.props.cityId, neighborHoodId).then(() => {
      this.props.fetchCities()
    });
  }

  render() {
    const neighborhoods = !this.props.neighborhoods ? null : this.props.neighborhoods.map((neighborhood) => {
      return (<NeighborhoodListItem cityId={this.props.cityId} deleteNeighborhood={this.deleteNeighborhood} key={neighborhood._id} neighborhood={neighborhood} /> );      
    })
    
    return (
      <div className="admin-neighborhoods">
        <ul className="list-group">
          <li className="list-item font-title-sm">Neighborhoods:</li>
          {neighborhoods}
        </ul>
      </div>
    )
  }
}

export default Neighborhoods;