// importing modules
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// checking if password matches
function comparePassword(suppliedPassword, databasePassword) {
  return bcrypt.compareSync(suppliedPassword, databasePassword);
}

// username stored to session
passport.serializeUser((user, done) => {
  console.log('serialize', user, '-------------');
  done(null, user.username);
});

// user info attached to req.user
passport.deserializeUser((username, done) => {
  console.log('deserialize', username, '-------');
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
          return done(null, false, { message: 'incorrect username' })
        }

        console.log('user ', user)
        // incorrect pssword
        if(!comparePassword(password, user.password_digest)) {
          console.log(password, user.password_digest)
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

module.exports = passport;