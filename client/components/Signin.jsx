import React, { Component } from 'react';
// import {
//   Redirect
// } from 'react-router-dom';

// styles
// import styles from './../css/style.css';
import Home from './Home';

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      em: '',
      pw: ''
    }

    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateEmail(e) {
    this.setState({em: e.target.value});
  }
  updatePassword(e) {
    this.setState({pw: e.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      em: this.state.em,
      pw: this.state.pw
     };
    console.log('data: ', data);

    $.ajax({
      type: 'POST',
      url: '/api/signin',
      data: data,
      // success callback must be an arrow function to preserve the current context!
      // Without the arrow function to bind 'this' for us...
      // 'this' refers to the jqXHR object of the Ajax call!
      success: (res) => {
        console.log('FE success singing in');
        console.log('res: ', res);
        console.log('this.props.toggleAuth: ', this.props.toggleAuth);
        this.props.toggleAuth(true);
      },
      error: (error) => {
        //clear inputs, then log error
        $('#emailSignin').val('');
        $('#passwordSignin').val('');
        console.log('ajax error signin post request to server: ', error);
      }
    });
  }

  render() {
    return (
      <form id="signin" onSubmit={this.handleSubmit}>
        <input id="emailSignin" name="emailSignin" placeholder="email" type="text" onChange={this.updateEmail}></input>
        <input id="passwordSignin" name="passwordSignin" placeholder="password" type="password" onChange={this.updatePassword}></input>
        <button id="submitSignin" type="submit">Sign In</button>
      </form>
    );
  }
}


export default Signin;
