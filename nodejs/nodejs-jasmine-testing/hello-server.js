const express = require('express');
const server = express();
const parser = require('body-parser');
server.use(parser.json());
server.use(parser.urlencoded({ extended:true}));

// status api
server.get('/status',(req,res)=>{
    res.status(200).json({
        message: 'Server is running'
    });
});

// message
server.get('/hello/:message',(req,res)=>{
    res.status(200).json({
        message: req.params.message
    });
});

server.listen(4102);