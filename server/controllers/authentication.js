const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../../config');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp}, config.jwt.secret);
}

exports.login = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
}

exports.register = (req, res, next) => {
  console.log('authenticaion registers: ', req);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password) {
    return res.status(422).send({ error: 'Requires an email or password' });
  }

  // if email already exits
  User.findOne({ email: email}, (err, existingUser) => {
    if(err) { return next(err); }

    // return error if email already exists
    if(existingUser) {
      return res.status(422).send({ error: 'Email already exits' });
    }

    // if email is not in use, create record
    const user = new User({
      firstName,
      lastName,
      email,
      password
    });

    user.save(err => {
      if(err) { return next(err); }

      res.json({ token: tokenForUser(user) });
    });
  });
}