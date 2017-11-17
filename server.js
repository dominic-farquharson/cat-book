// modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

// config
require('dotenv').config();

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// routes
app.get('/', (req, res) => {
  res.send('Home page')
})


// not found
app.use('*', (req, res) => {
  res.send('NOT FOUND')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})