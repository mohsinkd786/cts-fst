const express = require('express');
const server = express();
const parser = require('body-parser');
server.use(parser.json());
server.use(parser.urlencoded({extended:false}));

// status
server.get("/status",(req,res)=>{
    res.send('Server is up & running');
});

// message/:message
server.get("/message/:message",(req,res)=>{
    res.status(200).json({
        message: req.params.message
    });
});
// add user
server.post('/user/add',(req,res)=>{
    if(!req.body){
        res.status(400).json({message: 'Please give in the name'});
    }
    res.send(req.body.name);
});
// update the user
server.put('/user/edit',(req,res)=>{
    if(!req.body){
        res.status(400).json({message: 'Please give in the name'});
    }
    const name = 'Mr/Miss '+req.body.name;
    res.send(name);
})
const PORT = 3521
server.listen(PORT,()=>{
    console.log(`Server is Started at ${PORT}`);
})