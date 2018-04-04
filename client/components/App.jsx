// modules
import React, { Component } from 'react';


// // Styles
// import styles from './../css/style.css';

// Components
import Landing from './Landing'; // signin/register
import Home from './Home'; // todo list


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthed: false
    }
    this.toggleAuth = this.toggleAuth.bind(this);
  }

  toggleAuth() {
    this.setState({isAuthed: true});
  }


  render() {
    if (this.state.isAuthed) {
      return <Home toggleAuth={this.toggleAuth} />;
    } else {
      return <Landing toggleAuth={this.toggleAuth} />;
    }

  }
}

export default App;
