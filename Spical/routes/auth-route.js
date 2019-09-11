const router = require('express').Router();
const passport = require('passport');

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

router.get('/albums', (req,res) => {
    res.render('albums');
});

router.get('/register', (req,res) => {
    res.render('register');
});

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

// auth with Github
router.get('/github', passport.authenticate('github', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
    // res.send('you reached the redirect URI');
    // res.send(req.user);
    res.redirect('/profile/');
});


module.exports = router;