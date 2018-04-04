/*** usrController.js ***/
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;
const db = require('../models/database');
const usrController = {};


usrController.createUsr = (req, res, next) => {
  console.log('creating new user...');
  const { emailRegister, passwordRegister, passconfRegister } = req.body;
  if (passwordRegister !== passconfRegister) res.redirect('/');
  console.log('emailRegister: ', emailRegister);
  bcrypt.genSalt(SALT_WORK_FACTOR)
    .then(salt => bcrypt.hash(passwordRegister, salt))
    .then(hash => db.one('INSERT INTO usr(email, password) VALUES($1, $2) RETURNING usr_id', [emailRegister, hash]))
    .then(data => {
      res.locals.currentUsr = data.usr_id;
      next();
    })
    .catch(error => {
      console.log('failed to insert usr into db: ', error);
      return res.status(404).end('error inserting new user into db: ', error);
    });

}

usrController.verifyUsr = (req, res, next) => {
  console.log('req.body: ', req.body);
  db.any('SELECT * FROM usr WHERE email = ($1)', [req.body.em]).then((data) => {
    console.log('data: ', data);
    bcrypt.compare(req.body.pw, data[0].password, function(err, isMatch) {
      if (err) return console.log(err);
      if (isMatch) {
        console.log('UsrController, bcrypt compare, isMatch: ', isMatch);
        res.locals.currentUsr = data[0].usr_id;
        next(); // res.locals is the preffered way to send data through middleware.
      } else {
        console.log('UsrController, bcrypt compare, isMatch: ', isMatch);
        res.status(404).end('error finding user: ', req.body.user);
      }
    });

  }).catch((error) => {
    console.log('verify usr db error: ', error)
    res.status(404).end('error finding user: ', req.body.user)
  });
}


module.exports = usrController;
