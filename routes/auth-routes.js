const authRoutes = require('express').Router();
const User = require('../models/User');

authRoutes.post('/register', (req, res) => {
  User.create(req.body.username, req.body.password)
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
