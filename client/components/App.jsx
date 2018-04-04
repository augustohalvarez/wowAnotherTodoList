// modules
import React, { Component } from 'react';


// // Styles
// import styles from './../css/style.css';

// Components
import Landing from './Landing'; // signin/register
import Home from './Home'; // todo list (auth protected)


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthed: false
    }
    this.toggleAuth = this.toggleAuth.bind(this);
  }

  toggleAuth(bool) {
    this.setState({isAuthed: bool});
  }


  // When someone lands on our page, if they have a jwt persisted from another session,
  // call toggleAuth(true) to reset state and render <Home /> instead of <Landing />
  componentWillMount() {
    if (document.cookie.slice(0, 3) === 'jwt') {
      // This tells us that the user most likely got the token from us.
      // But it is no guarantee. We MUST verify server-side before calling toggleAuth(true);
      $.ajax({
        type: 'GET',
        url: '/api/verifyAndResetJWT',
        success: (res) => {          
          this.toggleAuth(true);
        },
        error: (error) => {
          console.log('could not verify JWT, try signing in or registering');
          console.log('error: ', error);
        }
      });

    }
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
