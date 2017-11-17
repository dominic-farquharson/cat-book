const authRoutes = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // salt + hash
const passport = require('../passport');

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
      // everything okay! - attach user object to req.user 
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
    if(!user) {
      req.flash('error', 'error logging in'); 
      return res.redirect('/auth/login')
    };

    // everything okay!
    req.login(user ,function(err) {
      if(err) return next(err);
      return res.redirect(`/${user.username}`);
    })

  })(req, res, next)
})


authRoutes.get('/login', (req, res) => {
  const error = req.flash('message');
  console.log('failure flash ', error)
  res.render('auth/login', {
    flash: error,
    auth: req.user? true : false
  })
})

authRoutes.get('/logout', (req, res) => {
  // terminate session, clear user property from req object
  req.logout();
  // redirect to home
  res.redirect('/auth/login');
})

authRoutes.get('/user', (req, res) => {
  res.json({
    profile: 'user profile',
    user: req.user
  })
})

module.exports = authRoutes;
