import React, { Component } from 'react';
import './Offering.scss';

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
      <div className="row admin-offering">
        <div className="col-xs-6">{this.props.offering.description} </div>
        <div className="col-xs-3">{this.props.offering.pending ? <div className="font-sm">*pending save</div> : null}</div>
        <div className="col-xs-3"><a className="button_sm button_valencia" onClick={this.handleDeleteClick}>x</a></div>        
      </div>
    );
  }
}

export default Offerings;