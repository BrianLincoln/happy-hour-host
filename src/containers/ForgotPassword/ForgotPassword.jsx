import React, { Component } from 'react';
import loginApi from '../../utils/LoginApi';
import './ForgotPassword.scss';

export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {};
  }

  handleSubmit(event) {
    event.preventDefault();
    loginApi.forgotPassword(this.email).then((response) => {
      if (response.success) {
        this.setState({
          statusText: 'Check your email',
          statusIconClasses: 'fa fa-envelope',
        });
      } else {
        this.setState({
          statusText: 'Something went wrong, try again later',
          statusIconClasses: 'fa fa-exclamation-triangle',
        });
      }
    });
  }

  render() {
    if (this.state.statusText) {
      return (
        <div className="forgot-password-status space-top-xl">
          <h1>
            <i className={this.state.statusIconClasses} aria-hidden="true" />
          </h1>
          <h2>{this.state.statusText}</h2>
        </div>
      );
    }

    return (
      <form
        className="form-group space-top-xl space-bottom-sm row"
        onSubmit={this.handleSubmit}
      >
        <div className="card col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
          <div className="card-heading">Password Recovery</div>
          <div className="form-element">
            <label htmlFor="email" className="font-title-sm form-label">
              Email:
              <input
                required
                id="email"
                type="email"
                ref={email => (this.email = email)}
              />
            </label>
          </div>
          <input
            className="button_sm button_curious"
            type="submit"
            value="Email me instructions"
          />{' '}
          or{' '}
          <a href="/login" className="color-curious">
            {' '}
            Log In
          </a>
        </div>
      </form>
    );
  }
}

export default ForgotPassword;
