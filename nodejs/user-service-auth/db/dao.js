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
const User = mongoose.model('user',userSchema);
const addUser = (user,callback)=>{
    const userObj = new User({ _id: user._id, email:user.email,password:user.password});
    User.create(userObj,(err,response)=>{
        callback(err,response);
    });
}
module.exports={
    _add : addUser
}