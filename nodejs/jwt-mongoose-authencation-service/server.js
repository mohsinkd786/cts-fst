const express = require('express');
const server = express();
const parser = require('body-parser');
const api = require('./api');
const jwt = require('jsonwebtoken');
const secret = require('./secret');
const bcrypt = require('bcrypt');
const securityService = require('./securityService');
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
    securityService.fetchRegisteredUser(req.body.email,req.body.password,(err,data)=>{
        if(err){
            res.statusCode(401).json({
                message: 'Unauthorized user,please try with valid credentials'
            });
        }else{
            const isValidCredentials = bcrypt.compareSync(req.body.password,data.password);
            if(isValidCredentials){
                const _jwtToken = jwt.sign(
                    {
                        email: req.body.email
                    },
                secret.privateKey,
                {
                    expiresIn: '1h'
                }  
                );
                securityService.setUserToken(req.body.email,_jwtToken,(err,response)=>{
                    if(err){
                        res.status(400).json({
                        message: 'Unable to process the request,please try again later'
                        });
                    }
                });

                res.json({
                    message: 'Token generated successfully',
                    token: _jwtToken
                })
            }else{
                res.json({
                    message: 'Invalid credentials,please try with valid ones'
                })
            }
        }
    });
});
// refreshing the token
server.post('/token/refresh',(req,res)=>{
    //res.setHeader('content-type','application/json');
    // get the existing token
    const token = req.body.token;
    const email = req.body.email;
    const isValidToken = jwt.verify(token,secret.privateKey);
    console.log(isValidToken);
    if(isValidToken){
        const _jwtRefreshToken = jwt.sign(
            {
                email: req.body.email
            },
            secret.privateKey,
            {
                expiresIn: '1h'
            }     
        );
        securityService.updateUserToken(email,_jwtRefreshToken,(err,response)=>{
            if(err){
                res.status(400).json({
                    message: 'Unable to process the request,please try again later'
                });
            }else{
                res.status(200).json({
                    message: 'Refresh Token Generated Successfully',
                    refreshToken: _jwtRefreshToken
                });
            }
        })
    }else{
        return res.json({
            message: 'Invalid token'
        });
    }
})
// secure the endpoints
server.use((req,res,next)=>{
    const token = req.headers['bearer'];
    if(token !== undefined){
        jwt.verify(token,secret.privateKey,(err,decodedStr)=>{
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