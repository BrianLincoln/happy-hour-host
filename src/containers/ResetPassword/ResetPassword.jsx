import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import loginApi from '../../utils/LoginApi';
import './ResetPassword.scss';

const propTypes = {
  token: PropTypes.string.isRequired,
};

export class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {};
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.password.value === this.confirmPassword.value) {
      loginApi
        .resetPassword(
          this.email, this.password, this.props.token
        )
        .then((response) => {
          if (response.success) {
            window.location = '/admin/signout';
          } else {
            this.setState({
              invalidToken: true,
            });
          }
        });
    } else {
      this.setState({
        passwordMismatch: true,
      });
    }
  }

  render() {
    if (this.state.invalidToken) {
      const link = (
        <Link
          to={{
            pathname: '/forgot-password',
          }}
        >
          here
        </Link>
      );

      return (
        <div className="reset-password-invalid space-top-xl">
          <h2>Expired or invalid token</h2>
          <p>Request a new token {link}.</p>
        </div>
      );
    }

    const passwordMismatch = this.state.passwordMismatch ? (
      <div className="color-valencia font-sm space-top-xs">
        Passwords are different
      </div>
    ) : null;

    return (
      <form
        className="form-group space-top-xl space-bottom-sm row"
        onSubmit={this.handleSubmit}
      >
        <div className="card col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
          <div className="card-heading">Reset Password</div>
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
          <div className="form-element">
            <label htmlFor="password" className="font-title-sm form-label">
              New Password:
              <input
                required
                id="password"
                type="password"
                ref={password => (this.password = password)}
              />
            </label>
          </div>
          <div className="form-element">
            <label
              htmlFor="password-check"
              className="font-title-sm form-label"
            >
              Confirm Password:
              <input
                required
                id="confirm-password"
                type="password"
                ref={confirmPassword =>
                  (this.confirmPassword = confirmPassword)
                }
              />
            </label>
          </div>
          {passwordMismatch}
          <input
            className="button_sm button_curious"
            type="submit"
            value="Email me a new password"
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

ResetPassword.propTypes = propTypes;

export default ResetPassword;
