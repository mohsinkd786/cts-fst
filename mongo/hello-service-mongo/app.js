const express = require('express');
const parser = require('body-parser');
const server = express();
const helloService = require('./services/helloService');

server.use(parser.json());
server.use(parser.urlencoded({
    extended : true
}));
// status service
server.get('/status',(req,res)=>{
    res.send('Service is running \n');
});

//get all messages service
server.get('/messages',(req,res)=>{
    res.setHeader('Content-Type','application/json');
    helloService._all((msgs)=>{
        res.send(JSON.stringify(msgs));
        res.end('\n');
    });
});
// Add a new message Service
server.post('/addMessage',(req,res)=>{
    res.setHeader('Content-Type','application/json');
    //get message from request body
    let msg = req.body;
    //console.log('Message '+JSON.stringify(msg));
    helloService._add(msg,(err)=>{
        if(err)
            res.statusCode(400).end('Unable to add the message,try again later');
        else
            res.send('Message Added Successfully');
    });
});

// get specific message as per criteria
server.get('/message/:str',(req,res)=>{
    res.setHeader('content-type','application/json');
    let msgParam = req.params.str;
    console.log('Str '+msgParam);

    helloService._one(msgParam,(data)=>{
        res.send(JSON.stringify(data));
    }); 
});

//modify the message
server.put('/message/update',(req,res)=>{
    res.setHeader('content-type','application/json');
    let data = req.body;
    helloService._edit(data,(err)=>{
        if(err)
            res.statusCode(400).end(`Request couldn't be completed,please try again later`);
        else
            res.end('Message modified successfully');
    });
});
// listener port
const port = 1124;
server.listen(port,()=>{
    console.log(`Server started at ${port}`);
});