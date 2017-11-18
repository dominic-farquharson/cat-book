const authController = {};
const passport = require('../passport');
passport();

// login a user
authController.login = (req, res, next) => {
    // DEFAULT REDIRECT
    // authRoutes.post('/login', passport.authenticate('local', {
    //   successRedirect: '/auth/user',
    //   failureRedirect: '/auth/login',
    //   failureFlash: true
    // }))
  
    passport(req, res).authenticate('local', function(err, user, info) {
      // custrom redirect 
      if(err) return next(err);
      if(!user) {
        return res.redirect('/auth/login')
      };
  
      // everything okay!
      req.login(user ,function(err) {
        if(err) return next(err);
        req.flash('info', 'welcome to CatBook'); 
        return res.redirect(`/${user.username}`);
      })
  
    })(req, res, next)
}

// login view
authController.renderLogin = (req, res, next) => {
  res.render('auth/login', {
    flash: req.flash(),
    auth: req.user? true : false
  })
}

// register
authController.renderRegister = (req, res, next) => {
  res.render('auth/register', {
    auth: false
  });
}

// logout user
authController.logout = (req, res, next) => {
  // terminate session, clear user property from req object
  req.logout();
  // redirect to home
  res.redirect('/auth/login');
}


module.exports = authController;