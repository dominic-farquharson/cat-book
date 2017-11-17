const feedController = {};
const Feed = require('../models/Feed');

feedController.create = (req, res) => {
  const { post } = req.body;

  Feed.create({
    username: req.user.username, 
    post
  })
    .then(post => {
      console.log('new post that has been created ', post)
      res.redirect('/');
    })
    .catch(err => {
      res.status(500).json({err})
    })
  
}

feedController.index = (req, res) => {
  Feed.findAll()
    .then(posts => {
      res.render('index', {
        auth: req.user? true : false,
        user: req.user? req.user : null,
        posts
      })
    })
    .catch(err => {
      res.status(500).json({err})
    })
}


module.exports = feedController;