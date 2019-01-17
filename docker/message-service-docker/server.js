const express = require('express');
const parser = require('body-parser');
const server = express();

server.use(parser.json());
server.use(parser.urlencoded({extended:false}));

//status api
server.get('/status',(req,res)=>{
    res.status(200).json({message: 'Message Service is up'});
})

// message api
server.get('/message/:message',(req,res)=>{
    res.status(200).json({
        message: req.params.message
    })
})
const PORT = 7011;
server.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
});
