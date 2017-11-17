// importing modules
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy(
  function(username, password, done) {
    User.findOne({username}, function(err, user) {
      if(err) { return done(err) };

      // user doesn't exist
      if(!user) {
        return done(null, false, { message: 'incorrect username' })
      }

      // incorrect pssword
      if(!user.validPassword(password)) {
        return done(null, false, { message: 'incorrect password' })
      }

      // successful login
      return done(null, user)
    })
  }
))