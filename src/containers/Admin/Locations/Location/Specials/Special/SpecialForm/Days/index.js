import React, { Component } from 'react';

export class Days extends Component {
  constructor(props) {
    super(props);

    this.handleDayChange = this.handleDayChange.bind(this);
  }   

  handleDayChange(event) {
      let dayNumber = null;
      let newDays = this.props.days;

      switch (event.target.id) {
        case "day-sunday":
          dayNumber = 0;
          break;
        case "day-monday":
          dayNumber = 1;
          break;
        case "day-tuesday":
          dayNumber = 2;
          break;
        case "day-wednesday":
          dayNumber = 3;
          break;
        case "day-thursday":
          dayNumber = 4;
          break;
        case "day-friday":
          dayNumber = 5;
          break;
        case "day-saturday":
          dayNumber = 6;
          break;
      }
      const index = this.props.days.indexOf( dayNumber);

      if ( index > -1 ) {
        newDays.splice(index, 1);
      } else {
        newDays.push(dayNumber);
      }
      this.props.handleDayChange(newDays);
    }  

  render() {
    return (
      <div className="form-element">
        <table>
          <tbody>
            <tr>
              <th><label htmlFor="day-sunday">Sun</label></th>
              <th><label htmlFor="day-monday">Mon</label></th>
              <th><label htmlFor="day-tuesday">Tue</label></th>
              <th><label htmlFor="day-wednesday">Wed</label></th>
              <th><label htmlFor="day-thursday">Thu</label></th>
              <th><label htmlFor="day-friday">Fri</label></th>
              <th><label htmlFor="day-saturday">Sat</label></th>
            </tr>
            <tr>
              <td><input id="day-sunday" onChange={this.handleDayChange} type="checkbox" checked={this.props.days.indexOf(0) > -1} /></td>
              <td><input id="day-monday" onChange={this.handleDayChange} type="checkbox" checked={this.props.days.indexOf(1) > -1} /></td>
              <td><input id="day-tuesday" onChange={this.handleDayChange} type="checkbox" checked={this.props.days.indexOf(2) > -1} /></td>
              <td><input id="day-wednesday" onChange={this.handleDayChange} type="checkbox" checked={this.props.days.indexOf(3) > -1} /></td>
              <td><input id="day-thursday" onChange={this.handleDayChange} type="checkbox" checked={this.props.days.indexOf(4) > -1} /></td>
              <td><input id="day-friday" onChange={this.handleDayChange} type="checkbox" checked={this.props.days.indexOf(5) > -1} /></td>
              <td><input id="day-saturday" onChange={this.handleDayChange} type="checkbox" checked={this.props.days.indexOf(6) > -1} /></td>
            </tr>
          </tbody>
        </table>
      </div>           
    )
  }
}

export default Days;