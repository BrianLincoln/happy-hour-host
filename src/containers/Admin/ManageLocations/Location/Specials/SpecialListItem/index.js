import React, { Component } from 'react';

export class SpecialListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    this.handleClick =  this.handleClick.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
  }  

  handleClick() {
    this.props.selectSpecial(this.props.special);
  }

  handleDeleteButtonClick() {
    this.props.deleteSpecial(this.props.special._id);
  }  

  render() {

    return (
      <div className="admin-location-listitem">
        <a onClick={this.handleClick}> 
            <h3 key={this.props.special._id}>{this.props.special.headline}</h3>
        </a>
        <button className="button_sm button_valencia" onClick={this.handleDeleteButtonClick}><i className="fas fa-trash"></i></button> 
      </div>
    );
    
  }
}

export default SpecialListItem;