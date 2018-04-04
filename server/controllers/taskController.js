
// const Task = require('../models/TaskModel'),
const jwt = require('jsonwebtoken')
const db = require('../models/database');

const taskController = {};

// This function will decode the payload in our jwt to find out who is the current usr_id.
const jwtVerifyAsync = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
        reject(res.json({ success: false, message: 'Failed to get current user token.' }));
      } else {
        resolve(decoded.usr);
      }
    });
  });
};



taskController.getTasks = (req, res) => {
  console.log('get tasks...');

  const token = req.cookies.jwt;
  console.log('token: ', token);
  if (token) {
    // DB query must happen AFTER we finish verifying the jwt, so we chain the promises.
    jwtVerifyAsync(token, process.env.JWT_SECRET)
      .then((payload) => {
        console.log('payload', payload);

        return db.any('SELECT * FROM task WHERE usr_id = $1', [payload])
    })
      .then((data) => {
        console.log('data: ', data);
        return res.status(200).end(JSON.stringify(data))
      })
      .catch(error => {
        console.log('error getting tasks: ', error);
        return res.status(404).end('Error getting tasks in db')
      });
  }
}

taskController.postTask = (req, res) => {
  console.log('post task...');
  const { content } = req.body; // Get user input (task content)
  // Before we store this into the db, we also need the currentUsrID
  // We'll grab the current userID that's stored in our encoded JWT

  const token = req.cookies.jwt;
  if (token) {
    // DB query must happen AFTER we finish verifying the jwt, so we chain the promises.
    let currentUsr; // verify token to get current userID
    jwtVerifyAsync(token, process.env.JWT_SECRET)
      .then((payload) => {
        console.log(payload);
        currentUsrID = payload;
      })
      .then(() => db.none('INSERT INTO task (content, usr_id) VALUES ($1, $2)', [content, currentUsrID]))
      .then(() => res.status(200).end('Successfully inserted task in db.'))
      .catch(error => {
        return res.status(404).end('Error inserting task in db');
      });
  }

  // If thread of exec. reaches here we know a jwt was not found, so we redirect to login
  return res.redirect('/');
};



taskController.removeTask = (req, res) => {
  console.log('remove task...');
  let valuesArr = [req.body.payload];
  console.log('valuesArr: ', valuesArr);

  db.none('DELETE FROM task WHERE task_id = ($1)', valuesArr)
    .then(() => {
      console.log('success removing from db!');
      res.status(200).end("element removed from db");
    })
    .catch(error => {
      console.log('db error: ', error);
      res.status(404).end('An error occurred removing a task from the db')
    });

}

module.exports = taskController;
