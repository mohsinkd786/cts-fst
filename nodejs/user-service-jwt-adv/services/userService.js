const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/jwtsample');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});
const User = mongoose.model('User',userSchema);

const signup = (user,callback)=>{
    // synchronous method for hashing
    let hashedPassword = bcrypt.hashSync(user.password,10);
    const userObj = new User({
        email: user.email,
        password: hashedPassword
    });
    User.create(userObj,(err,response)=>{
        callback(err,response);
    });
    
}

module.exports= {
    signup : signup
}