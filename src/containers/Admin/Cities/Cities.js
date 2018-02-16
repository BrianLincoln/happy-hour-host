import React, { Component } from 'react';
import City from './City';
import AddCity from './AddCity';

export class Cities extends Component {
  render() {
    const cities = !this.props.cities ? null : this.props.cities.map((city) => {
      return (<City key={city._id} city={city} getCities={this.props.getCities}/> );
    })
    
    return (
      <div className="card">
        <div className="card-heading">
          <h1>Cities</h1>
          <AddCity getCities={this.props.getCities} />
        </div>
        <ul className="list-group">
          {cities}
        </ul>
      </div>
    )
  }
}

export default Cities;