const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const usrController = require('./controllers/usrController');
const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');
const app = express();
const db = require('./models/database');

app.use(express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.post('/signin', usrController.verifyUsr, authController.setJWT);

app.post('/register', usrController.createUsr, authController.setJWT);

app.get('/secret', authController.verifyJWT);

app.get('/getTasks', taskController.getTasks);

app.post('/postTask', taskController.postTask);

app.post('/removeTask', taskController.removeTask);

app.listen(3333);

module.exports = app;
