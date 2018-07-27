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

const app = (module.exports = express());
const secretConfig = require('./secret-config');

app.use(require('helmet')());

app.set('secretCode', secretConfig.secretCode); // secret variable

mongoose.connect('mongodb://localhost:27017/happy2',
  {
    useMongoClient: true,
  });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.options('*', cors());

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());

// Serve static assets
app.use(express.static(path.resolve(
  __dirname, '..', 'build'
)));

// Configuring Passport --
// TODO: this is not secret... it should be
app.use(session({
  secret: 'keyboard cat',
  cookie: {
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
app.use(flash());

// Initialize Passport
const initPassport = require('./passport/init');

initPassport(passport);

const routes = require('./routes/routes')(passport);

app.use('/', routes);
