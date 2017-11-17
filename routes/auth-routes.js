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
      // everything okay!
      req.login(user ,function(err) {
        if(err) return next(err);
        return res.redirect(`/${user.username}`);
      })
    })
    .catch(err => {
      console.log('error is ', err)
      res.json({err})
    })
})

// DEFAULT REDIRECT
// authRoutes.post('/login', passport.authenticate('local', {
//   successRedirect: '/auth/user',
//   failureRedirect: '/auth/login',
//   failureFlash: true
// }))

authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    // custrom redirect 
    if(err) return next(err);
    if(!user) return res.redirect('/auth/login');

    // everything okay!
    req.login(user ,function(err) {
      if(err) return next(err);
      return res.redirect(`/${user.username}`);
    })

  })(req, res, next)
})


authRoutes.get('/login', (req, res) => {
  res.render('auth/login')
})

authRoutes.get('/user', (req, res) => {
  res.json({
    profile: 'user profile',
    user: req.user
  })
})

module.exports = authRoutes;
