const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    local:{
        username: String,
        email: String,
        password: String,
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