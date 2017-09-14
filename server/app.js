const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const app = express();
app.use(require('helmet')());

mongoose.connect("mongodb://localhost:27017/happy", { useMongoClient: true });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.options('*', cors());

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Configuring Passport
app.use(session({
  secret: 'keyboard cat',
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());



 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
 app.use(flash());

 // Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);


var routes = require('./routes/index')(passport);
app.use('/', routes);


var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}




module.exports = app;