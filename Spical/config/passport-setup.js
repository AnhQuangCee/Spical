const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const LocalStrategy = require("passport-local");
const keys = require("./keys");
const User = require("../models/user-models");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
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
        if (currentUser) {
          //already have the user
          // console.log('User is: ' + currentUser);
          done(null, currentUser);
        } else {
          // if not, create user in our db
          var newUser = new User();
          // lưu thông tin cho tài khoản local
          newUser.google.username = profile.displayName;
          newUser.google.googleId = profile.id;
          newUser.google.thumbnail = profile._json.picture;
          // lưu user
          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
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
        console.log(profile);
        if (currentUser) {
          //already have the user
          // console.log('User is: ' + currentUser);
          done(null, currentUser);
        } else {
          // if not, create user in our db
          var newUser = new User();
          // lưu thông tin cho tài khoản local
          newUser.facebook.username = profile.displayName;
          newUser.facebook.facebookId = profile.id;
          // newUser.facebook.thumbnail = profile._json.picture;
          // lưu user
          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }
      });
    }
  )
);

// Register
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      // mặc định local strategy sử dụng username và password,
      // chúng ta cần cấu hình lại
      // username: "username",
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true // cho phép chúng ta gửi reqest lại hàm callback
    },
    function(req, email, password, done) {
      // asynchronous
      // Hàm callback của nextTick chỉ được thực hiện khi hàm trên nó trong stack (LIFO) được thực hiện
      // User.findOne sẽ không được gọi cho tới khi dữ liệu được gửi lại
      process.nextTick(function() {
        // Tìm một user theo email
        // chúng ta kiểm tra xem user đã tồn tại hay không
        User.findOne({ "local.email": email }, function(err, user) {
          if (err) return done(err);
          if (user) {
            return done(null, false);
          } else {
            // Nếu chưa user nào sử dụng email này
            // tạo mới user
            var newUser = new User();
            // lưu thông tin cho tài khoản local
            newUser.local.username = req.body.username;
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);
            // lưu user
            newUser.save(function(err) {
              if (err) throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }
  )
);

// Login
passport.use(
  "local-login",
  new LocalStrategy(
    {
      // username: "username",
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      // callback với email và password từ html form
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      // tìm một user với email
      // chúng ta sẽ kiểm tra xem user có thể đăng nhập không
      User.findOne({ "local.email": email }, function(err, user) {
        if (err) return done(err);
        // if no user is found, return the message
        if (!user)
          return done(null, false, req.flash("loginMessage", "No user found."));
        // if the user is found but the password is wrong
        if (!user.validPassword(password))
          return done(
            null,
            false,
            req.flash("loginMessage", "Oops! Wrong password.")
          ); // thông báo lỗi chỉ này chỉ dùng khi dev
        // all is well, return successful user
        return done(null, user);
      });
    }
  )
);
