import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Specials.scss';
import AddSpecial from './Special/SpecialForm/SpecialForm';
import SpecialListItem from './SpecialListItem/SpecialListItem';
import Special from './Special/Special';
import locationApi from '../../../utils/LocationApi';

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
    const { selectedSpecial } = this.state;
    const {
      fetchLocation, locationId,
    } = this.props;

    const selectSpecial = selectedSpecial;

    fetchLocation(locationId);

    this.setState({
      selectedSpecial: selectSpecial,
    });
  }

  handleSubmitNewSpecial(special) {
    const {
      fetchLocation, locationId,
    } = this.props;

    locationApi.postSpecial(locationId, special).then(() => {
      fetchLocation(locationId);
      this.setState({
        showAddSpecialForm: false,
        selectedSpecial: null,
      });
    });
  }

  handleSubmitEditSpecialForm(special, specialId) {
    const {
      locationId, fetchLocation,
    } = this.props;

    this.setState({
      selectedSpecial: null,
    });

    locationApi.updateSpecial(
      locationId, specialId, special
    ).then(() => {
      fetchLocation(locationId);
    });
  }

  deleteSpecial(specialId) {
    const {
      locationId, fetchLocation,
    } = this.props;

    locationApi.deleteSpecial(locationId, specialId).then(() => {
      fetchLocation(locationId);
      this.setState({
        showAddSpecialForm: false,
      });
    });
  }

  toggleAddSpecialForm() {
    const { showAddSpecialForm } = this.state;

    this.setState({
      showAddSpecialForm: !showAddSpecialForm,
    });
  }

  render() {
    const {
      showAddSpecialForm, selectedSpecial,
    } = this.state;
    const { specials } = this.props;

    if (showAddSpecialForm) {
      return (
        <AddSpecial
          handleSubmitSpecialForm={this.handleSubmitNewSpecial}
          handleCancelSpecialForm={this.toggleAddSpecialForm}
        />
      );
    }
    if (selectedSpecial) {
      return (
        <Special
          special={selectedSpecial}
          deselectSpecial={this.handleDeselectSpecial}
          deleteSpecial={this.deleteSpecial}
          handleSubmitEditSpecialForm={this.handleSubmitEditSpecialForm}
          cancelEditSpecial={this.cancelEditSpecial}
        />
      );
    }
    const specialsComponent = specials.map(special => (
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
              type="button"
              onClick={this.toggleAddSpecialForm}
              className="button_sm button_dark admin-add-location-action"
            >
              + add special
            </button>
          </div>
          {specialsComponent}
        </div>
      </div>
    );
  }
}

Specials.propTypes = propTypes;

export default Specials;
