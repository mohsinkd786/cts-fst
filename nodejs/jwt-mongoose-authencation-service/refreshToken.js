const express = require('express');
const jwtRoutes = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jwt_authentication');
const parser = require('body-parser');
jwtRoutes.use(parser.json());
jwtRoutes.use(parser.urlencoded({ extended: true}))

const Schema = mongoose.Schema;
const userTokenSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    refreshToken:{
        type: String,
        required: false
    }
});
const userToken = mongoose.model('usertoken',userTokenSchema);

jwtRoutes.post('/token',(req,res)=>{
    const _email = req.body.email;
    const _id =  req.body._id;
    const _token = jwt.sign(
        {
            email: req.body.email
        },
        "this-is-my-secret-key",
        {
            expiresIn: '1h'
        }  
        );
    const _refreshToken = '5e22yeartwine';
    userToken.create({
        _id:_id,
        email:_email,
        token:_token,
        refreshToken:_refreshToken
     },(err,response)=>{
        if(err){
            res.status(400).json({
                message: 'Unable to create the Token',
                error: err
            });
        }else{
            res.status(200).json({
                message: 'Token Generated',
                token: _token,
                refreshToken: _refreshToken
            });
        }
    });
}); 

// refresh Token
jwtRoutes.post('/token/refresh',(req,res)=>{
    const rToken = req.body.refreshToken;
    res.setHeader('content-type','application/json');
    userToken.findOne({refreshToken:rToken},(err,data)=>{
        if(err){
            res.status(400).json({
                message: 'Unable to refresh the token',
                error: err
            });
        }else if(data.length>0){
            console.log(data.length);
            const _refreshToken = jwt.sign(
                {
                    email: data.email
                },
                "this-is-my-secret-key",
                {
                    expiresIn: '1h'
                });
            userToken.update({
                email:data.email,
                refreshToken:req.body.refreshToken
            },
            {
                $set: {
                    refreshToken: _refreshToken
                }
            });
            res.status(200).json({
                message: 'Token Refreshed Successfully',
                token: _refreshToken
            });
        }
    });
});

jwtRoutes.listen(4510,()=>{
    console.log(`Server Started at 4510`);
});