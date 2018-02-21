import React, { Component } from 'react';
import './City.scss';
import CityDetails from './../CityDetails/';

export class City extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state =  {
      showDeleteCity: false,
      showCityDetails: false
    }
  }
  handleClick(event) {
    this.setState({showCityDetails: !this.state.showCityDetails});
  }
  render() {
    return (
      <div className="list-item">
        <div className="admin-city">
          <h2 onClick={this.handleClick} className="font-title-md admin-city-name">{this.props.city.name}</h2>            
          {this.state.showCityDetails ? <CityDetails {...this.props.city} fetchCities={this.props.fetchCities} /> : null}          
        </div>
      </div>
    )
  }
}

export default City;