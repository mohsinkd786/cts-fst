const express = require('express');
const server = express();
//const router = express.Router();
const jwt = require('jsonwebtoken');
const parser = require('body-parser');
const dao = require('./db/dao');
const security = require('./security');
server.use(parser.json());
server.use(parser.urlencoded({
    extended : true
}));

// status 
server.get('/status',(rq,rs)=>{
    rs.json({
        msg : 'User Service is running'
    });
});
// register a user
server.post('/register',(rq,rs)=>{
    rs.setHeader('content-type','application/json');
    const user = rq.body;
    dao._add(user,(err,response)=>{
        if(err)
            rs.send('Unable to register the user',err);
        else 
            rs.send('Registeration Successful');
    });
});

//login
server.post('/login',(req,res)=>{
    res.setHeader('content-type','application/json');
    const user = req.body;
    //const jwtToken = security._generate(user);
    
    const secret = 'this-is-my-personal-jwt-secret';
    const jwtToken = jwt.sign({email: user.email,_id:user._id},secret,{expiresIn: '1h'});
    console.log(jwtToken);

    res.status(200).json({
        msg : "Success",
        token: jwtToken
    })
})
// set context path with routes
//server.use('/user-service',router);

const port = 5215;
server.listen(port,()=>{
    console.log(`Server started at ${port}`);
})