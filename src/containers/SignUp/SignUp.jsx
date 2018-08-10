import React, { Component } from 'react';
import loginApi from '../../utils/LoginApi';

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {};
  }

  handleSubmit(event) {
    event.preventDefault();
    loginApi.signUp(this.email, this.password).then((status) => {
      if (status === 200) {
        window.location.href = '../admin';
      } else {
        this.setState({
          failureText: 'Pshhh... get out of here',
        });
      }
    });
  }

  render() {
    const { failureText } = this.state;

    if (failureText) {
      return <h2>{failureText}</h2>;
    }

    return (
      <form
        className="form-group space-top-xl space-bottom-sm row"
        onSubmit={this.handleSubmit}
      >
        <div className="card col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
          <div className="card-heading">Sign Up</div>
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
              Password:
              <input
                required
                id="password"
                type="password"
                ref={password => (this.password = password)}
              />
            </label>
          </div>
          <input
            className="button_sm button_curious"
            type="submit"
            value="Sign Up"
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

export default Signup;
