import React, { Component } from 'react';

export class Neighborhoods extends Component {
  render() {
    return (
      <div className="list-item admin-neighborhood">
        {this.props.name}
      </div>
    )
  }
}

export default Neighborhoods;