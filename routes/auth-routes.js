const authRoutes = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // salt + hash
const passport = require('../passport');

authRoutes.post('/register', (req, res) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);

  console.log('do password mastch', bcrypt.compareSync(req.body.password, hash))

  const { username, email, first_name, last_name, description } = req.body;

  User.create({
    first_name,
    last_name,
    username,
    email,
    password_digest: hash,
    description
  })
    .then(user => {
      res.json({
        user
      })
    })
    .catch(err => {
      console.log('error is ', err)
      res.json({err})
    })
})

authRoutes.post('/login', passport.authenticate('local', {
  successRedirect: '/auth/user',
  failureRedirect: '/login',
  failureFlash: true
}))

authRoutes.get('/user', (req, res) => {
  res.json({
    profile: 'user profile',
    user: req.user
  })
})

module.exports = authRoutes;
