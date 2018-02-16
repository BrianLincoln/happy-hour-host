import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Special from './../../special';
import './Result.scss';

class Result extends Component {
  render() { 
    return (        
        <li className="text-result">          
          <h3 className="text-result-name">{this.props.name}</h3>
          <Link to={
              {pathname: `/location/${this.props._id}`,
              state: {...this.props}}
            }>view more</Link>
        </li>
    );
  }
}

export default Result;