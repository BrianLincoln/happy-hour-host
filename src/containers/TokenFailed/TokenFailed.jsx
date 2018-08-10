import React, { Component } from 'react';
import './TokenFailed.scss';

class TokenFailed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countdown: 3,
    };

    this.countdown = this.countdown.bind(this);
  }

  componentDidMount() {
    this.countdown();
  }

  countdown() {
    const { countdown } = this.state;

    if (countdown === 0) {
      window.location = '/login';
    } else {
      setTimeout(() => {
        this.setState({
          countdown: countdown - 1,
        },
        () => {
          this.countdown();
        });
      }, 500);
    }
  }

  render() {
    const { countdown } = this.state;

    return (
      <div className="token-failed">
        <div className="container">
          <h1>You need to log in</h1>
          <h2>redirecting in {countdown}</h2>
        </div>
      </div>
    );
  }
}

export default TokenFailed;
