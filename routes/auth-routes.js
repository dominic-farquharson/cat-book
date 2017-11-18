const authRoutes = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // salt + hash
const passport = require('../passport');
const authController = require('../controllers/auth-controller');
const userController = require('../controllers/user-controller');

authRoutes.get('*', (req, res, next) => {
  const path = req.path.substring(1,);
  if(path === 'register' || path === 'login') {
    if(req.user) {
     return res.redirect(`/${req.user.username}`)
    } else {
      return next();
    }
  }
  next();
})

authRoutes.post('/register', userController.create);
authRoutes.get('/register', authController.renderRegister);
authRoutes.post('/login', authController.login)
authRoutes.get('/login', authController.renderLogin);
authRoutes.get('/logout', authController.logout);

authRoutes.get('/user', (req, res) => {
  res.json({
    profile: 'user profile',
    user: req.user
  })
})

module.exports = authRoutes;
