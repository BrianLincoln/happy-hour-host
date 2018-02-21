import React, { Component } from 'react';
import cityApi from './../../../../utils/CityApi';

export class AddCity extends Component {
  constructor(props) {
    super(props);

    this.toggleAddCityForm = this.toggleAddCityForm.bind(this);
    this.handleCityNameChange = this.handleCityNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state =  {
      cityName: '',
      showAddCityForm: false
    }
  }    
  toggleAddCityForm() {
    this.setState({showAddCityForm: !this.state.showAddCityForm});
  }
  handleCityNameChange(event) {
    this.setState({cityName: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    cityApi.postCity(this.state.cityName).then(() => this.props.fetchCities());
    this.setState({showAddCityForm: false});
  }
  render() {
    if (this.state.showAddCityForm) {
      return (
        <div>
          <button onClick={this.toggleAddCityForm} className="button_sm button_dark admin-add-city-action">x hide</button>
          <form className="space-top-sm space-bottom-sm" onSubmit={this.handleSubmit}>          
            <label className="font-title-sm" htmlFor="city-name">name: </label>
            <input required type="text" id="city-name" value={this.state.cityName} onChange={this.handleCityNameChange} />
            <input className="button_sm button_curious" type="submit" value="Submit" />
          </form>
        </div>
      )
    } else {
      return (
        <button onClick={this.toggleAddCityForm} className="button_sm button_dark admin-add-city-action">+ add city</button>
      )      
    }
  }
}

export default AddCity;