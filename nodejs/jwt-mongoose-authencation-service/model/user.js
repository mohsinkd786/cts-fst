const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jwt-auth-sample');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: false
    }
});
const User = mongoose.model('user',userSchema);
module.exports={
    User: User
}