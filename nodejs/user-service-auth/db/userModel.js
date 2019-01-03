const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/security');

const userSchema = mongoose.Schema({
    _id: Number,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
module.exports =mongoose.model('User',user);