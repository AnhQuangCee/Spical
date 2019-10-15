const express = require('express');
const router = express.Router();
const ImagesControllers = require('../controllers/Images-controller');

// get a list image in Image
router.get('/image', ImagesControllers.getImages);

// add new image to the database
router.post('/image', ImagesControllers.postImages);

// update a image to the database
router.put('/image/:id', ImagesControllers.putImages);

// delete image to the database
router.delete('/image/:id', ImagesControllers.deleteImages);

module.exports = router;