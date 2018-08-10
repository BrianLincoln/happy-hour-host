import React, { Component } from 'react';
import loginApi from '../../utils/LoginApi';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {};
  }

  handleSubmit(event) {
    event.preventDefault();
    loginApi.login(this.email, this.password).then((response) => {
      if (response.success === false) {
        this.setState({
          invalidLogin: true,
        });
      }
    });
  }

  render() {
    const { invalidLogin } = this.state;

    const invalidLoginComponent = invalidLogin ? (
      <div className="validation-text">Invalid email or password</div>
    ) : null;

    return (
      <form
        className="form-group space-top-xl space-bottom-sm row"
        onSubmit={this.handleSubmit}
      >
        <div className="card col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
          <div className="card-heading">Log In</div>
          <div className="form-element">
            <label htmlFor="email" className="font-title-sm form-label">
              Email:
              <input
                id="email"
                type="text"
                ref={email => (this.email = email)}
              />
            </label>
          </div>
          <div className="form-element">
            <label htmlFor="password">
              Password:
              <input
                id="password"
                type="password"
                ref={password => (this.password = password)}
              />
            </label>
          </div>
          {invalidLoginComponent}
          <button
            type="submit"
            className="button_sm button_curious space-bottom-md"
          >
            Log In
          </button>
          <p>
            No account?{' '}
            <a href="/signup" className="color-curious">
              Sign Up
            </a>
          </p>
          <p>
            Forgot Password?{' '}
            <a href="/forgot-password" className="color-curious">
              Go Here
            </a>
          </p>
        </div>
      </form>
    );
  }
}

export default Login;
