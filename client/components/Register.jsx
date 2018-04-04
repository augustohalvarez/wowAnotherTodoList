
import React, { Component } from 'react';

// styles
// import styles from './../css/style.css';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      foo: 'bar'
    }
  }

  render() {
    return (
        <form id="register" onSubmit={this.handleRegister}>
          <input id="emailRegister" name="emailRegister" placeholder="email" type="text"></input>

          <input id="passwordRegister" name="passwordRegister" placeholder="password" type="password"></input>

          <input id="passconfRegister" name="passconfRegister" placeholder="confirm password" type="password"></input>

          <button id="submitRegister" type="submit">Register</button>
        </form>
    );
  }
}

export default Register;
