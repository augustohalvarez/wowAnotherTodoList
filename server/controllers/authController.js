const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const path = require('path');


// This promisifys the jwt.sign method
const jwtSignAsync = (pyld, scrt) => {
  return new Promise((resolve, reject) => {
    jwt.sign(pyld, scrt, {expiresIn: 6000}, function(error, token) {
      if (error) {
        console.log('jwt sign error: ', error);
        reject(res.json({jwtSignAsyncError : error}));
      } else {
        console.log('setting jwt in res.cookie');
        resolve(token);
      }
    });
  });
}


const authController = {};

authController.setJWT = (req, res, next) => {
  console.log('Creating token...')
  const payload = {
    usr: res.locals.currentUsr
  };

  jwtSignAsync(payload, process.env.JWT_SECRET)
    .then((token) => res.cookie('jwt', token))
    .then(() => res.json({success: true}))
    .catch((err) => {
      return console.log('authController setJWT error: ', err)
    })
}

authController.verifyJWT = (req, res, next) => {
  console.log('Verifying token...');
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.', error: err });
      }
      // if successfull, "decoded" now contains the payload.
      res.locals.currentUsr = decoded.usr; // this is the payload
      res.json({success: true});
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
}

module.exports = authController;
