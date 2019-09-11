const express = require("express");
const authRoutes = require('./routes/auth-route');
const profileRoutes = require('./routes/profile-route');
const keys = require('./config/keys');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const path = require('path');
const passportSetup = require('./config/passport-setup');

const app = express();
app.use(express.static('public'))

// setyp view engine
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

//use cookie-session
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys:[keys.session.cookieKey]
}));

//initialize cookie
app.use(passport.initialize());
app.use(passport.session());

// Use mongodb
mongoose.connect(keys.mongodb.dbURL, () => {
  console.log("Connect to mongodb");
});

// create home route
app.get("/", (req, res) => {
  res.render("home");
});
// setup router
app.use('/auth', express.static('public'), authRoutes);
app.use('/profile', express.static('public'),  profileRoutes);

// Listen Port: 3000
app.listen(3000, () => {
  console.log('App now listening for request on port 3000');
});
