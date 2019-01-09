const express = require('express');
const routes = express.Router();
const bcrypt = require('bcrypt'); 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jwt-auth-sample');

// add a new user
routes.post('/user/save',(req,res)=>{
    // encrypt password
    const hashPassword = bcrypt.hashSync(req.body.password,10);
    const userObj = {
        _id: req.body._id,
        email: req.body.email,
        password: hashPassword,
        salary: req.body.salary
    }
    res.setHeader('content-type','application/json');
    User.create(userObj,(err,response)=>{
        if(err){
            res.status(400).json({
                message: 'Unable to process the request',
                errorMessage: err
            });
        }else{
            res.status(200).json({
                message: 'User saved successfully'
            });
        }
    })
});
routes.get('/message/:message',(req,res)=>{
    res.json({
        message: req.params.message
    });
});

// 
routes.post('/employees',(req,res)=>{
    res.json({
        emps: [
            {
                name: 'John'
            },
            {
                name: 'Bob'
            }
        ]
    })
})

module.exports={
    routes: routes
}