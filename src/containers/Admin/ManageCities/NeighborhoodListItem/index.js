import React, { Component } from 'react';
import './NeighborhoodListItem.scss';

export class NeighborhoodListItem extends Component {
    constructor() {
        super();

        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    }

    handleDeleteButtonClick() {
        if (window.confirm("◔_◔ Super sure you want to delete " + this.props.neighborhood.name + "?")) {
            this.props.deleteNeighborhood(this.props.neighborhood._id);
        }
    }
    
    render() {
        return (
            <div className="admin-neighborhood-listitem">
                <a href={`/admin/city/${this.props.cityId}/neighborhood/${this.props.neighborhood._id}`}> 
                    <h3 key={this.props.neighborhood._id}>{this.props.neighborhood.name}</h3>
                </a>
                <button className="button_sm button_valencia" onClick={this.handleDeleteButtonClick}><i className="fas fa-trash"></i></button> 
            </div>
        );
    }
}

export default NeighborhoodListItem;