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

module.exports = userController;