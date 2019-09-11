const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const GithubStrtegy = require("passport-github");
const keys = require("./keys");
const User = require("../models/user-models");

passport.serializeUser((user,done) => {
  done(null,user.id);
});

passport.deserializeUser((id,done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // option for GoogleStrategy
      callbackURL: "http://localhost:3000/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(currentUser => {
        console.log(profile);
        if (currentUser) {
          //already have the user
          // console.log('User is: ' + currentUser);
          done(null, currentUser);
        } else {
          // if not, create user in our db
          new User({
            username: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.picture
          })
            .save()
            .then(newUser => {
              // console.log("New User created" + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);

// With Facebook
passport.use(
  new FacebookStrategy(
    {
      // option for GoogleStrategy
      callbackURL: "http://localhost:3000/auth/facebook/redirect",
      clientID: keys.facebook.clientID,
      clientSecret: keys.facebook.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id }).then(currentUser => {
        // console.log(profile);
        if (currentUser) {
          //already have the user
          // console.log('User is: ' + currentUser);
          done(null, currentUser);
        } else {
          // if not, create user in our db
          new User({
            username: profile.displayName,
            facebookId: profile.id,
            // thumbnail: profile._json.picture
          })
            .save()
            .then(newUser => {
              // console.log("New User created" + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);

// With Github
passport.use(
  new GithubStrtegy(
    {
      // option for GoogleStrategy
      callbackURL: "http://localhost:3000/auth/github/redirect",
      clientID: keys.github.clientID,
      clientSecret: keys.github.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ githubId: profile.id }).then(currentUser => {
        console.log(profile);
        if (currentUser) {
          //already have the user
          // console.log('User is: ' + currentUser);
          done(null, currentUser);
        } else {
          // if not, create user in our db
          new User({
            username: profile.displayName,
            facebookId: profile.id,
            thumbnail: profile._json.avatar_url
          })
            .save()
            .then(newUser => {
              // console.log("New User created" + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);