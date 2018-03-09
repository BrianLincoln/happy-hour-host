import React, { Component, } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  days: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleDayChange: PropTypes.func.isRequired,
};

export class Days extends Component {
  constructor(props) {
    super(props);

    this.handleDayChange = this.handleDayChange.bind(this);
  }

  handleDayChange(event) {
    let dayNumber = null;
    const newDays = this.props.days;

    switch (event.target.id) {
      case 'day-sunday':
        dayNumber = 0;
        break;
      case 'day-monday':
        dayNumber = 1;
        break;
      case 'day-tuesday':
        dayNumber = 2;
        break;
      case 'day-wednesday':
        dayNumber = 3;
        break;
      case 'day-thursday':
        dayNumber = 4;
        break;
      case 'day-friday':
        dayNumber = 5;
        break;
      case 'day-saturday':
        dayNumber = 6;
        break;

      // no default
    }
    const index = this.props.days.indexOf(dayNumber);

    if (index > -1) {
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
              <th>
                <span htmlFor="day-sunday">Sun</span>
              </th>
              <th>
                <span htmlFor="day-monday">Mon</span>
              </th>
              <th>
                <span htmlFor="day-tuesday">Tue</span>
              </th>
              <th>
                <span htmlFor="day-wednesday">Wed</span>
              </th>
              <th>
                <span htmlFor="day-thursday">Thu</span>
              </th>
              <th>
                <span htmlFor="day-friday">Fri</span>
              </th>
              <th>
                <span htmlFor="day-saturday">Sat</span>
              </th>
            </tr>
            <tr>
              <td>
                <input
                  id="day-sunday"
                  onChange={this.handleDayChange}
                  type="checkbox"
                  checked={this.props.days.indexOf(0) > -1}
                />
              </td>
              <td>
                <input
                  id="day-monday"
                  onChange={this.handleDayChange}
                  type="checkbox"
                  checked={this.props.days.indexOf(1) > -1}
                />
              </td>
              <td>
                <input
                  id="day-tuesday"
                  onChange={this.handleDayChange}
                  type="checkbox"
                  checked={this.props.days.indexOf(2) > -1}
                />
              </td>
              <td>
                <input
                  id="day-wednesday"
                  onChange={this.handleDayChange}
                  type="checkbox"
                  checked={this.props.days.indexOf(3) > -1}
                />
              </td>
              <td>
                <input
                  id="day-thursday"
                  onChange={this.handleDayChange}
                  type="checkbox"
                  checked={this.props.days.indexOf(4) > -1}
                />
              </td>
              <td>
                <input
                  id="day-friday"
                  onChange={this.handleDayChange}
                  type="checkbox"
                  checked={this.props.days.indexOf(5) > -1}
                />
              </td>
              <td>
                <input
                  id="day-saturday"
                  onChange={this.handleDayChange}
                  type="checkbox"
                  checked={this.props.days.indexOf(6) > -1}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Days.propTypes = propTypes;

export default Days;
