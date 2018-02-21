import React, { Component } from 'react';
import locationApi from './../../utils/LocationApi';
import Special from './../../components/Special/Special';
import './Location.scss';

class Location extends Component {

  constructor(props) {
    super(props);

    this.fetchLocation = this.fetchLocation.bind(this);
    this.setDocumentTitle = this.setDocumentTitle.bind(this);
    this.state = null;
  }

  componentDidMount() {
    if (this.props.location) {
      this.setState({...this.props.location}, () => {
        this.setDocumentTitle()
      }); 
    } else {
      this.fetchLocation();  
    }  
  }

  fetchLocation() {
    locationApi.getLocation(this.props.locationId).then((location) => {
      if (location) {
        this.setState({...location}, () => {
          this.setDocumentTitle()
        }); 
      } else {
        this.setState({notFound: true});
      }
    });  
  } 

  setDocumentTitle() {
    document.title = `${this.state.name} Happy Hour - Food & Drink Specials in ${this.state.address.city}, ${this.state.address.state}`;
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
        <span className="font-sm">directions</span>      
      </a>
    ) : null;

    return (     
      <div className="container">   
        <div className="location row">
          <div className="col-xs-12 col-md-6 col-xl-8">
            <h1 className="location-name">{this.state.name}</h1>
            {websiteLink}
            {googleMapLink}
          </div>
          <div className="col-xs-12 col-md-6 col-xl-4">
            <ul className="special-list">{specials}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Location;