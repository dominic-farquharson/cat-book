// modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./routes/auth-routes')
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

// config
require('dotenv').config();
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// routes
app.get('/', (req, res) => {
  res.status(200).send('Home page')
})
app.use('/auth', authRoutes);

// not found
app.use('*', (req, res) => {
  res.send('NOT FOUND')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})


