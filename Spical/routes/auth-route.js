const router = require('express').Router();
const passport = require('passport');
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

// auth login
router.get('/login', (req,res) => {
    res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    res.redirect('/');
});

// router.get('/albums', (req,res) => {
//     res.render('albums');
// });

// Register
router.get('/register', (req,res) => {
    res.render('register');
});
router.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/profile', // chuyển hướng tới trang được bảo vệ
    failureRedirect: '/auth/register', // trở lại trang đăng ký nếu có lỗi
    failureFlash: true // allow flash messages
}));

// Login
router.get('/login', (req,res) => {
    res.render('/auth/login', {message: req.flash('loginMessage')});
});
// Xử lý thông tin khi có người thực hiện đăng nhập
router.post('/login', passport.authenticate("local-login", {
    successRedirect : '/profile',
    failureRedirect : '/auth/login',
    failureFlash : true
}));

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send('you reached the redirect URI');
    // res.send(req.user);
    res.redirect('/profile/');
});

// auth with facebbok
router.get('/facebook', passport.authenticate('facebook', {
    scope: []
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    // res.send('you reached the redirect URI');
    // res.send(req.user);
    res.redirect('/profile/');
});

module.exports = router;