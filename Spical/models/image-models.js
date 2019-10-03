const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    title:{
        type: String
    },
    location:{
        type: String
    },
    images: {
        type: [String]
    }
});

const Image = mongoose.model('image', imageSchema);

module.exports = Image;
