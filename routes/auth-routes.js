const authRoutes = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // salt + hash

authRoutes.post('/register', (req, res) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);

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

module.exports = authRoutes;
