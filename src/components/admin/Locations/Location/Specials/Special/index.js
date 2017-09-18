import React, { Component } from 'react';
import SpecialForm from './SpecialForm';
import locationApi from './../../../../../../utils/LocationApi';

export class Special extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    this.handleClick =  this.handleClick.bind(this);
  }  

  handleClick() {
    this.props.selectSpecial(this.props.special);
  }

  render() {

    return (
      <div className="list-item specials-list-item" onClick={this.handleClick}>
        {this.props.special.headline}
      </div>
    );
    
  }
}

export default Special;