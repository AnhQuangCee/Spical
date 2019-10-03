const router = require('express').Router();
const Image = require('../models/Image-models');

// const authCheck = (req,res,next) => {
//     if(!req.image){
//         // if user is not logged in
//         res.redirect('/auth/login');
//     } else{
//         // if logged in
//         next();
//     }
// }
router.get('/', (req,res) => {
    // res.send('You are login, this is profile: ' + req.user.username);
    Image.find({}).then(function(image){
        for(var InstanA of image){
            InstanA.images.forEach(function(item){
                console.log(item);
            });
        }
        res.render('albums', {imageA: InstanA});

        console.log(InstanA);
        // var imageGroups = image.forEach(function(item){
        //     console.log(item);
        // });
    });
});

module.exports = router;