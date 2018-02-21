import React, { Component } from 'react';

export class SelectCity extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }   
    handleChange(event) {
        this.props.handleCitySelect(event.target.value);
    }
    render() {
        let options = this.props.cities.map((city) => {
            return <option key={city._id} value={city._id}>{city.name}</option>;
        })
        return (
            <select onChange={this.handleChange}>
                <option default>Select City</option>
                {options}
            </select>
        )
    }
}

export default SelectCity;