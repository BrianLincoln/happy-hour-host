import React, { Component } from 'react';
import cityApi from './../../../../utils/CityApi';

export class AddNeighborhood extends Component {
  constructor(props) {
    super(props);

    this.toggleAddNeighborhoodForm = this.toggleAddNeighborhoodForm.bind(this);
    this.handleNeighborhoodNameChange = this.handleNeighborhoodNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state =  {
      neighborhoodName: '',
      showAddNeighborhoodForm: false
    }
  }    
  toggleAddNeighborhoodForm() {
    this.setState({showAddNeighborhoodForm: !this.state.showAddNeighborhoodForm});
  }
  handleNeighborhoodNameChange(event) {
    this.setState({neighborhoodName: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    cityApi.postNeighborhood(this.props._id, this.state.neighborhoodName).then(() => this.props.fetchCities());;
  }
  render() {
    if (this.state.showAddNeighborhoodForm) {
      return (
        <div>
          <button onClick={this.toggleAddNeighborhoodForm} className="button_sm button_dark admin-add-neighborhood-action">x hide</button>
          <form className="space-top-sm space-bottom-sm" onSubmit={this.handleSubmit}>          
            <label htmlFor="neighborhood-name">name: </label>
            <input required type="text" id="neighborhood-name" value={this.state.neighborhoodName} onChange={this.handleNeighborhoodNameChange} />
            <input className="button_sm button_curious" type="submit" value="Submit" />
          </form>
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={this.toggleAddNeighborhoodForm} className="button_sm button_dark admin-add-neighborhood-action">+ add neighborhood</button>
        </div>
      )      
    }
  }
}

export default AddNeighborhood;