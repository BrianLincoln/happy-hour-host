import React, { Component } from 'react';

export class Offerings extends Component {
  constructor(props) {
    super(props);

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick(event) {
    event.preventDefault();

    this.props.deleteOffering(this.props.index);
  }  
  render() {
    return (
      <div>
        {this.props.offering.description} <a className="color-valencia" onClick={this.handleDeleteClick}>delete</a>
      </div>
    );
  }
}

export default Offerings;