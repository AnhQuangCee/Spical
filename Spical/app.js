const express = require("express");
const authRoutes = require('./routes/auth-route');
const profileRoutes = require('./routes/profile-route');
const imageRoutes = require('./routes/image-route');
const albumsRoutes = require('./routes/albums-route');
const keys = require('./config/keys');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const path = require('path');
const passportSetup = require('./config/passport-setup');
const bcrypt = require("bcrypt");
const flash = require('connect-flash');
const bodyParser = require("body-parser");
const app = express();

// setyp view engine
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
//use cookie-session
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys:[keys.session.cookieKey]
}));

//use flash
app.use(flash());

//initialize cookie
app.use(passport.initialize());
app.use(passport.session());

// express use
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}));

//Body-parser
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use mongodb
// mongoose.connect(keys.mongodb.dbURL, () => {
//   console.log("Connect to mongodb");
// });
mongoose.connect('mongodb://localhost/spical');
mongoose.Promise = global.Promise;

// create home route
app.get("/", (req, res) => {
  res.render("home");
});
// app.get("/albums", (req, res) => {
//   res.render("albums",{image: req.image});
//   console.log(req.image);
// });

app.use('/albums', express.static('routes'));

// setup router
app.use('/auth', express.static('public'), authRoutes);
app.use('/profile', express.static('public'), profileRoutes);
app.use('/api', express.static('public'), imageRoutes);
app.use('/albums', express.static('public'), albumsRoutes);

// Error handling middleware
app.use(function(err,req,res,next){
  // res.status(422).render('error.ejs');
  res.status(422).send({error: err.message});
});

// Listen Port: 3000
app.listen(3000, () => {
  console.log('App now listening for request on port 3000');
});
