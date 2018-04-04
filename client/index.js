import React from 'react';
import { render } from 'react-dom';

import App from './components/App.jsx';

render((<App />), document.getElementById('index'));












//
// $(document).ready(function() {
//
//   // Define a function to repaint the dom when tasks are updated
//   const displayTasks = () => {
//     $('ul').empty(); // First clear all tasks from the dom
//
//     $.ajax({
//       type: 'GET',
//       url: '/getTasks',
//       success: function(res) {
//         console.log('tasks updated: ', JSON.parse(res));
//         // map through results, create <li>'s with task content in each li's value and a button of class remove,
//         // then append each element to #task-list
//         let taskArr = JSON.parse(res);
//         taskArr.forEach((taskObj) => {
//           let $li = $("<li></li>").text(taskObj.content);
//           $li.attr('id', taskObj.task_id);
//           $li.append($("<button>X</button>").attr("class", "remove"));
//           $("#task-list").append($li);
//         });
//       },
//       error: function() {
//         console.log('error with ajax get request to server.')
//       }
//     });
//   }
//
//   $('#retrieve').click(displayTasks); // Tasks should update on clicks to "Get Tasks" button
//
//
//
//
//   // Add Task
//   $('#task-button').click(function(event) {
//     if ($('#task').val().length === 0) { // return if input field is empty
//       return;
//     }
//
//     let data = {
//       content: $('#task').val()
//     };
//
//     $.ajax({
//       type: 'POST',
//       url: '/postTask',
//       data: data,
//       success: function() {
//         $('#task').val(''); // Clear input field
//         displayTasks(); // Update tasks
//       }
//     });
//   });
//
//
//
//
//   // Remove Task
//   $("#task-list").on('click', '.remove', function (event) {
//     let task_id = {payload: event.target.parentNode.id};
//     console.log('task_id clicked: ', task_id);
//     $.ajax({
//       type: 'POST',
//       url: '/removeTask',
//       data: task_id,
//       success: displayTasks
//     });
//
//   });
//
//
// });
