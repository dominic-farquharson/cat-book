const userController = {};
const User = require('../models/User');

userController.index = (req, res, next) => {
  User.findAll()
    .then(users => {
      res.render('cats/cats-index', {
        auth: req.user? true : false,
        user: req.user? req.user : null,
        users
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

module.exports = userController;