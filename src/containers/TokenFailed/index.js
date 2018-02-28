import React, { Component } from 'react';
import "./TokenFailed.scss";

class TokenFailed extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            countdown: 3
        }

        this.countdown = this.countdown.bind(this);
    }

    componentDidMount() {
        this.countdown();
    }

    countdown() {
        if (this.state.countdown === 0) {
            window.location = "/admin/login";
        } else {
            setTimeout(() => {
                this.setState({countdown: this.state.countdown - 1}, () => {
                    console.log(this.state.countdown);
                    this.countdown();                    
                });
            }, 1000)
        }
    } 
    
    render() {
        return (
            <div className="token-failed">
                <div className="container">
                    <h1>You need to log in</h1>
                    <h2>redirecting in {this.state.countdown}</h2>
                </div>
            </div>
        )
    }
  }
  
  export default TokenFailed;