const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jwt-auth-sample');
const User = require('./model/user').User;

const fetchRegisteredUser=(email,pwd,callback)=>{
    // fetch hash password
    User.findOne({email:email},(err,data)=>{
        callback(err,data);
    });
}

module.exports={
    fetchRegisteredUser: fetchRegisteredUser
}
