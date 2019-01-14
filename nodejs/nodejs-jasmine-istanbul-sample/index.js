const express = require('express');
const parser = require('body-parser');
const calculator = require('./calculator');
const server = express();
server.use(parser.json());
server.use(parser.urlencoded({extended:false}));

server.get('/sum/:i/:j',(req,res)=>{
    res.setHeader('content-type','application/json');
    res.status(200).json({
        data: calculator.sum(parseInt(req.params.i),parseInt(req.params.j))
    });
});
//
server.get('/diff/:i/:j',(req,res)=>{
    res.setHeader('content-type','application/json');
    res.status(200).json({
        data: calculator.diff(parseInt(req.params.i),parseInt(req.params.j))
    });
});
//
server.get('/product/:i/:j',(req,res)=>{
    res.setHeader('content-type','application/json');
    res.status(200).json({
        data: calculator.product(parseInt(req.params.i),parseInt(req.params.j))
    });
});
//
server.get('/division/:i/:j',(req,res)=>{
    res.setHeader('content-type','application/json');
    res.status(200).json({
        data: calculator.div(parseInt(req.params.i),parseInt(req.params.j))
    });
});

const port = 6111;
server.listen(port,()=>{
    console.log(`Server Started at ${port}`);
});
