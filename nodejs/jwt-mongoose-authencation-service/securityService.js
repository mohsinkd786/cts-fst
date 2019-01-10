const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jwt-auth-sample');
const User = require('./model/user').User;
const Security = require('./model/security').Security;

const fetchRegisteredUser=(email,pwd,callback)=>{
    // fetch hash password
    User.findOne({email:email},(err,data)=>{
        callback(err,data);
    });
}
// save generated token for user
const setUserToken = (_email,_token,callback)=>{
    const securityObj = {
        email: _email,
        token: _token
    } 
    Security.create(securityObj,(err,response)=>{
        callback(err,response);
    });
}
// fetch existing token for user
const fetchUserToken = (_email,_token,callback)=>{
    Security.find({email:_email,token:_token},(err,data)=>{
        callback(err,data);
    });
}
// update existing token for user
const updateUserToken = (_email,_refreshToken,callback)=>{
    Security.update({email:_email},{$set: {token:_refreshToken}},(err,response)=>{
        callback(err,response);
    })
}

module.exports={
    fetchRegisteredUser: fetchRegisteredUser,
    setUserToken: setUserToken,
    fetchUserToken: fetchUserToken,
    updateUserToken: updateUserToken
}
