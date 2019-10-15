const Image = require('../models/Image-models');

// GET: Images
exports.getImages = function(req,res,next){
    Image.find({}).then(function(image){
        res.send(image);
        // res.redirect('/albums/');
    });
}

// POST: Images
exports.postImages = function(req,res,next){
    Image.create(req.body).then(function(image){
        res.send(image);
    });
    res.send(req.body);
}

// PUT: Images
exports.putImages = function(req,res,next){
    Image.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Image.findOne({_id:req.params.id}).then(function(image){
            res.send(image);
        })
    })
}

// DELETE: Images
exports.deleteImages = function(req,res,next){
    // console.log(req.params.id);
    Image.findOneAndRemove({_id:req.params.id}).then(function(image){
        res.send(image);
    })
}
