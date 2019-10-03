const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// const imageSchema = new Schema({
//     title:{
//         type: String
//     },
//     location:{
//         type: String
//     },
//     images: {
//         type: [String]
//     }
// });

const userSchema = new Schema({
    local:{
        username: String,
        email: String,
        password: String,
        thumbnail: String,
        // photos: imageSchema
    },
    facebook:{
        username: String,
        facebookId: String,
        thumbnail: String,
    },
    google:{
        username: String,
        googleId: String,
        thumbnail: String,
    }
});

// methods ======================
// phương thực sinh chuỗi hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// kiểm tra password có hợp lệ không
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;