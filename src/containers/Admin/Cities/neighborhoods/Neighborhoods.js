import React, { Component } from 'react';
import Neighborhood from './Neighborhood';
import cityApi from './../../../../utils/CityApi';

export class Neighborhoods extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      showAddNeighborhood: false
    }
  }
  render() {
    const neighborhoods = !this.props.neighborhoods ? null : this.props.neighborhoods.map((neighborhood) => {
      return (<Neighborhood key={neighborhood._id} {...neighborhood} /> );      
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