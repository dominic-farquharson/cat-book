// importing modules
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// checking if password matches
function comparePassword(suppliedPassword, databasePassword) {
  console.log('did passwords match ? ', bcrypt.compareSync(suppliedPassword, databasePassword))
  return bcrypt.compareSync(suppliedPassword, databasePassword);
}

module.exports = (req, res) => {
  // username stored to session
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });
  
  // user info attached to req.user
  passport.deserializeUser((username, done) => {
    User.findByUsername(username)
      .then(user => {
        done(null, user);
      }).catch(err => {
        done(err, null);
      });
  });
  
  passport.use(new localStrategy(
    function(username, password, done) {
      User.findByUsername(username)
        .then(user => {
          // user doesn't exist
          if(!user) {
            req.flash('error', 'user does not exist')
            return done(null, false, { message: 'incorrect username' })
          }
          
          // incorrect pssword
          if(!comparePassword(password, user.password_digest)) {
            req.flash('error', 'Invalid password')
            return done(null, false, { message: 'incorrect password' })
          }
  
          // successful login
          return done(null, user)
        })
        .catch(err => {
          console.log('error ', err)
          return done(err)
        })
    }
  ))

  return passport;

}
