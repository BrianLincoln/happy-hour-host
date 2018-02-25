import React, { Component } from 'react';
import './CityListItem.scss';

export class CityListItem extends Component {
    constructor() {
        super();

        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    }

    handleDeleteButtonClick() {
        if (window.confirm("◔_◔ Super sure you want to delete " + this.props.city.name + "?")) {
            this.props.deleteCity(this.props.city._id);
        }
    }
    
    render() {
        return (
            <div className="admin-city-listitem">
                <a href={`/admin/city/${this.props.city._id}`}> 
                    <h3 key={this.props.city._id}>{this.props.city.name}</h3>
                </a>
                <button className="button_sm button_valencia" onClick={this.handleDeleteButtonClick}><i className="fas fa-trash"></i></button> 
            </div>
        );
    }
}

export default CityListItem;