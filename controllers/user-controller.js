const userController = {};
const User = require('../models/User');
const bcrypt = require('bcryptjs');

userController.index = (req, res, next) => {
  User.findAll()
    .then(users => {
      res.render('cats/cats-index', {
        auth: req.user? true : false,
        username: req.user? req.user.username : null,
        users,
        user: req.user ? req.user : null
      })
    })
    .catch(err => {
      res.status(500).json({
        err
      })
    })

}

userController.show = (req, res, next) => {
  User.findUserPublic(req.params.username)
    .then(user => {
      console.log('user ', user)
      // Render user profile info
      res.render('userProfile', {
        isUser: req.user ? req.user.username === req.params.username ? true : false : false,  // will eventually retrieve from database - will be public
        auth: req.user? true : false,
        user
      })
    })
    .catch(err => {
      console.log('error -----', err)
      // user does not exist
      res.redirect('/cats');
    })
}

// create user

userController.create = (req, res, next) => {
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
}

module.exports = userController;