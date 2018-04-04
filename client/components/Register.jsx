
import React, { Component } from 'react';

// styles
// import styles from './../css/style.css';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      em: '',
      pw: '',
      pc: ''
    }
    this.toggle = props.toggleAuth;
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updatePassconf = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateEmail(e) {
    this.setState({em: e.target.value});
  }
  updatePassword(e) {
    this.setState({pw: e.target.value});
  }
  updatePassconf(e) {
    this.setState({pc: e.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      em: this.state.em,
      pw: this.state.pw,
      pc: this.state.pc
     };
    console.log('data: ', data);

    $.ajax({
      type: 'POST',
      url: '/api/register',
      data: data,
      // success callback below must be an arrow function to preserve the current context!
      // Without the arrow function to bind 'this' for us...
      // 'this' refers to the jqXHR object of the Ajax call!
      success: (res) => {
        console.log('FE success registering');
        console.log('res: ', res);
        this.props.toggleAuth(true);
      },
      error: (error) => {
        $('#emailRegister').val('');
        $('#passwordRegister').val('');
        $('#passconfRegister').val('');
        console.log('ajax error signin post request to server: ', error);
      }
    });
  }

  render() {
    return (
        <form id="register" onSubmit={this.handleSubmit}>
          <input id="emailRegister" name="emailRegister" placeholder="email" type="text"></input>
          <input id="passwordRegister" name="passwordRegister" placeholder="password" type="password"></input>
          <input id="passconfRegister" name="passconfRegister" placeholder="confirm password" type="password"></input>
          <button id="submitRegister" type="submit">Register</button>
        </form>
    );
  }
}

export default Register;
