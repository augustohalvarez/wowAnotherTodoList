import React, { Component } from 'react';

import Signin from './Signin';
import Register from './Register';

// styles
// import styles from './../css/style.css';

const Landing = (props) => {
  return (
    <div>
      <Signin toggleAuth={props.toggleAuth}/>
      <Register toggleAuth={props.toggleAuth}/>
    </div>
  );
}


export default Landing;
