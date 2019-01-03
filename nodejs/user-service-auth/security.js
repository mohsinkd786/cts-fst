const jwt = require('jsonwebtoken');

const secret = 'this-is-my-personal-jwt-secret';
const jwtToken =(user)=>{
    jwt.sign({email: user.email,_id:user._id},secret,{expiresIn: '1h'});
}
module.exports={
    _generate : jwtToken
}