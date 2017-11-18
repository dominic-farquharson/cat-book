// modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./routes/auth-routes')
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
const userController = require('./controllers/user-controller');
const feedController = require('./controllers/feed-controller');

// config
require('dotenv').config();
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// routes
app.get('/', feedController.index);
app.use('/auth', authRoutes);

app.get('/cats', userController.index);
app.post('/feed', (req, res, next)=> req.user? next() : res.redirect('/auth/login'), feedController.create)

// prevent favicion from being caught
app.get('/favicon.ico', function(req, res) {
  res.status(204);
});

app.get('/:username', userController.show);

// not found
app.use('*', (req, res) => {
  res.send('NOT FOUND')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})


