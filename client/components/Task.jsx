import React, { Component } from 'react';

// styles
// import styles from './../css/style.css';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <li id={this.props.taskId}>
        {this.props.taskContent}
        <button className="remove">X</button>
      </li>
    );
  }
}

export default Task;
