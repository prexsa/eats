const express = require('express');
//const React = require('react');
//const Router = require('react-router');
const bodyParser = require('body-parser');
const path = require('path');
// const morgan = require('morgan');
//const mongoose = require('mongoose');
const cors = require('cors');
//const cookieParser = require('cookie-parser');
const routes = require('./routes.js');

// mongoose.connect('mongodb://localhost:auth/auth');

const app = express();

// app.use(morgan('combined')); // logging incoming request from the server
app.use(cors());
//app.use(cookieParser());
app.use(bodyParser.json({ type: '*/*'}));

routes(app);

app.set('port', (process.env.PORT || 3090));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});