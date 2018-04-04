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
    this.toggle = props.toggleAuth;
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


    // 'this' is undefined inside of ajax, so we reassign this.toggle()
    const onSuccess = this.toggle;
    $.ajax({
      type: 'POST',
      url: '/api/signin',
      data: data,
      success: function(res) {
        console.log('FE success in siningin');
        console.log('res: ', res);
        console.log('onSuccess: ', onSuccess);
        onSuccess();
      },
      error: function(error) {
        console.log('ajax error signin post request to server: ', error);
        return;
      }
    });
    console.log('incorrect email, password, or both');
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
