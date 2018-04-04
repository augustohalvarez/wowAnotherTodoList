import React, { Component } from 'react';
import Task from './Task';

// styles
// import styles from './../css/style.css';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allTasks: [],
      taskInput: ''
    }
    this.displayTasks = this.displayTasks.bind(this);
    this.addTask = this.addTask.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  componentWillMount() {
    this.displayTasks();
  }

  displayTasks() {
    $.ajax({
      type: 'GET',
      url: '/api/getTasks',

      success: function(res) {
        console.log('tasks updated: ', JSON.parse(res));
        let taskArr = JSON.parse(res);
        taskArr.forEach((taskObj) => {
          let currentTask = <Task taskId={taskObj.task_id} taskContent={taskObj.content} />
          this.state.allTasks.push(CurrentTask);
        });
      },

      error: function() {
        console.log('error with ajax get request to server.');
      }
    });
  }

  addTask() {
    if ($('#taskInput').val().length === 0) { // return if input field is empty
      return;
    }

    let data = {
      content: $('#taskInput').val()
    };

    $.ajax({
      type: 'POST',
      url: '/api/postTask',
      data: data,
      success: function() {
        $('#taskInput').val(''); // Clear input field
        this.displayTasks(); // Update tasks
      }
    });
  }


  updateInput() {
    this.setState({taskInput: $('#taskInput').val()});
  }


  render() {
    return (
      <div>
        <div id="inputContainer">
          <input id='taskInput' onChange={this.updateInput} onSubmit={this.addTask}></input>
        </div>

        <div id="taskContainer">
          {this.state.allTasks}
        </div>
      </div>
    );
  }
}





// First write a function to update the tasks displayed
// Call this function on componentWillMount, and both buttons.




export default Home;
