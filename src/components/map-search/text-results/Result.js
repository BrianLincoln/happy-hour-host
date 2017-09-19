import React, { Component } from 'react';
import Special from './Special';
import './Result.scss';

class Result extends Component {
  render() { 
    let specials = this.props.specials.map((special) => {
      return <Special key={special._id} {...special} />
    });
    let websiteLink = this.props.website ? (
      <a className="text-result-link" href={this.props.website}>
        <i className="text-result-link-icon fa fa-globe" aria-hidden="true"></i> 
        <span className="font-sm">website</span>
      </a>
    ) : null;

    let googleMapLink = this.props.googleMapLink ? (
      <a className="text-result-link" href={this.props.googleMapLink}>      
        <i className="text-result-link-icon fa fa-map-marker" aria-hidden="true"></i>  
        <span className="font-sm">google maps</span>      
      </a>
    ) : null;

    return (        
        <li className="text-result">
          <h3 className="text-result-name">{this.props.name}</h3>
          {websiteLink}
          {googleMapLink}
          <ul className="special-list">{specials}</ul>
        </li>
    );
  }
}

export default Result;