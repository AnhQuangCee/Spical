const express = require('express');
const router = express.Router();
const Image = require('../models/Image-models');

// get a list image in Image
router.get('/image', function(req,res,next){
    Image.find({}).then(function(image){
        res.send(image);
        // res.redirect('/albums/');
    });
});

// add new image to the database
router.post('/image', function(req,res,next){
    Image.create(req.body).then(function(image){
        res.send(image);
    });
    res.send(req.body);
});

// update a image to the database
router.put('/image/:id', function(req,res,next){
    Image.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Image.findOne({_id:req.params.id}).then(function(image){
            res.send(image);
        })
    })
});

// delete image to the database
router.delete('/image/:id', function(req,res,next){
    // console.log(req.params.id);
    Image.findOneAndRemove({_id:req.params.id}).then(function(image){
        res.send(image);
    })
});

module.exports = router;