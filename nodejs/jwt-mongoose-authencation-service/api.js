const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');

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