import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import locationApi from './../../utils/LocationApi';
import Special from './../special';
import './Location.scss';

class Location extends Component {
  constructor(props) {
    super(props);

    this.setLocation = this.setLocation.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    this.state = null;
  }
  componentDidMount() {
    this.setLocation();
  }
  setLocation() {
    locationApi.getLocation(this.props.locationId).then((location) => {
      if (location) {
        this.setState({...location}); 
      } else {
        this.setState({notFound: true});
      }
    });    
  } 
  handleBackButtonClick(event) {
    this.props.history.goBack();
  }
  render() { 
    if (this.state === null) {
      return <h1>Loading...</h1>;
    } else if (this.state.notFound) {
      return <h1>Huh... couldn't find a matching location</h1>
    }
    
    let specials = this.state.specials ? this.state.specials.map((special) => {
      return <Special key={special._id} {...special} />
    }) 
    : null;

    let websiteLink = this.state.website ? (
      <a className="location-meta-link" href={this.state.website}>
        <i className="location-meta-link-icon fa fa-globe" aria-hidden="true"></i> 
        <span className="font-sm">website</span>
      </a>
    ) : null;

    let googleMapLink = this.state.googleMapLink ? (
      <a className="location-meta-link" href={this.state.googleMapLink}>      
        <i className="location-meta-link-icon fa fa-map-marker" aria-hidden="true"></i>  
        <span className="font-sm">google maps</span>      
      </a>
    ) : null;

    return (        
        <div className="location">
          <h1 className="location-name">{this.state.name}</h1>
          {websiteLink}
          {googleMapLink}
          <ul className="special-list">{specials}</ul>
        </div>
    );
  }
}

export default Location;