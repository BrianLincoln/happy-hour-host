import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Specials.scss';
import AddSpecial from './Special/SpecialForm';
import SpecialListItem from './SpecialListItem/';
import Special from './Special/';
import locationApi from './../../../utils/LocationApi';

const propTypes = {
  locationId: PropTypes.string.isRequired,
  fetchLocation: PropTypes.func.isRequired,
  specials: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
  })).isRequired,
};

export class Specials extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddSpecialForm: false,
      selectedSpecial: null,
    };

    this.handleSelectSpecial = this.handleSelectSpecial.bind(this);
    this.handleDeselectSpecial = this.handleDeselectSpecial.bind(this);
    this.handleSubmitNewSpecial = this.handleSubmitNewSpecial.bind(this);
    this.deleteSpecial = this.deleteSpecial.bind(this);
    this.handleSubmitEditSpecialForm = this.handleSubmitEditSpecialForm.bind(this);
    this.toggleAddSpecialForm = this.toggleAddSpecialForm.bind(this);
    this.cancelEditSpecial = this.cancelEditSpecial.bind(this);
  }

  handleSelectSpecial(special) {
    this.setState({
      selectedSpecial: special,
    });
  }

  handleDeselectSpecial() {
    this.setState({
      selectedSpecial: null,
    });
  }

  cancelEditSpecial() {
    const selectSpecial = this.state.selectedSpecial;

    this.props.fetchLocation(this.props.locationId);
    this.setState({
      selectedSpecial: selectSpecial,
    });
  }

  handleSubmitNewSpecial(special) {
    locationApi.postSpecial(this.props.locationId, special).then(() => {
      this.props.fetchLocation(this.props.locationId);
      this.setState({
        showAddSpecialForm: false,
        selectedSpecial: null,
      });
    });
  }

  handleSubmitEditSpecialForm(special, specialId) {
    this.setState({
      selectedSpecial: null,
    });

    locationApi
      .updateSpecial(
        this.props.locationId, specialId, special
      )
      .then(() => {
        this.props.fetchLocation(this.props.locationId);
      });
  }

  deleteSpecial(specialId) {
    locationApi.deleteSpecial(this.props.locationId, specialId).then(() => {
      this.props.fetchLocation(this.props.locationId);
      this.setState({
        showAddSpecialForm: false,
      });
    });
  }

  toggleAddSpecialForm() {
    this.setState({
      showAddSpecialForm: !this.state.showAddSpecialForm,
    });
  }

  render() {
    if (this.state.showAddSpecialForm) {
      return (
        <AddSpecial
          handleSubmitSpecialForm={this.handleSubmitNewSpecial}
          handleCancelSpecialForm={this.toggleAddSpecialForm}
        />
      );
    } else if (this.state.selectedSpecial) {
      return (
        <Special
          special={this.state.selectedSpecial}
          deselectSpecial={this.handleDeselectSpecial}
          deleteSpecial={this.deleteSpecial}
          handleSubmitEditSpecialForm={this.handleSubmitEditSpecialForm}
          cancelEditSpecial={this.cancelEditSpecial}
        />
      );
    }
    const specials = this.props.specials.map(special => (
      <SpecialListItem
        key={special._id}
        special={special}
        selectSpecial={this.handleSelectSpecial}
        deleteSpecial={this.deleteSpecial}
      />
    ));

    return (
      <div>
        <div className="specials-list list-group">
          <div className="list-item specials-list-item">
            <button
              onClick={this.toggleAddSpecialForm}
              className="button_sm button_dark admin-add-location-action"
            >
              + add special
            </button>
          </div>
          {specials}
        </div>
      </div>
    );
  }
}

Specials.propTypes = propTypes;

export default Specials;
