const express = require('express');
const server = express();
const parser = require('body-parser');
const api = require('./api');
const jwt = require('jsonwebtoken');
// parser
server.use(parser.json());
server.use(parser.urlencoded({ extended: true}));
// status api
server.get('/status',(req,res)=>{
    res.setHeader('content-type','application/json');
    res.json({message: 'Service is running'});
});
// authenticate & generate valid token
server.post('/authenticate',(req,res)=>{
    res.setHeader('content-type','application/json');
    const _jwtToken = jwt.sign(
        {
            email: 'mo@global.com',
            pass: 'pass@123'
        },
      'my-secret-is-secured',
      {
          expiresIn: '1h'
      }  
    );
    res.json({
        message: 'Token generated successfully',
        token: _jwtToken
    })
});
// secure the endpoints
server.use((req,res,next)=>{
    const token = req.headers['bearer'];
    //console.log('##### ',token);
    if(token !== undefined || token !== ''){
        jwt.verify(token,'my-secret-is-secured',(err,decodedStr)=>{
            if(err){
                return res.json({
                    message: 'Invalid token'
                });
            }else{
                next();
            }
        });
    }else{
        return res.json({
            message: 'Seems! you forgot to send the token'
        })
    }
});

// specify routes
server.use('/api',api.routes);
//listen port
const port = 8343
server.listen(port,()=>{
    console.log(`Server is started at ${port}`);
});