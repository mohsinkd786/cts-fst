const request = require('request');
const url = 'http://localhost:3521'; 
describe('Express Index Service',()=>{
    //console.log('express index service');
    it('should return a success response code of 200',()=>{
        request.get(url+'/status',(err,res)=>{
            expect(res.statusCode).toEqual(200);
        });
    });
    it('should return Server is up & running message',()=>{
        request.get(url+'/status',(err,res,body)=>{
            expect(body).toBe('Server is up & running');
        });
    });
    it('should return a status code of 200',()=>{
        request.get(url+'/message/hello',(err,res,body)=>{
            expect(res.statusCode).toBe(200);
        });
    });
    it('should return the message as Hello',()=>{
        request.get(url+'/message/Hello',(err,res,body)=>{
            expect(body).toBe('{"message":"Hello"}');
        });
    });
    it('should return the status code 404',()=>{
        request.get(url+'/message',(err,res)=>{
            expect(res.statusCode).toBe(404);
        });
    });
    it('should return body with name as User1',()=>{
        request.post(url+'/user/add',{json:true,body:{ "name":"User1" }},(err,res,body)=>{
            expect(body).toBe('User1');
        });
    });
    /*it('should return the status code 404',()=>{
        request.post(url+'/user/add',{json:true,body:{}},(err,res)=>{
            expect(res.statusCode).toEqual(404);
        });
    });*/
    it('should return body with Mr/Miss prefixed ',()=>{
        request.put(url+'/user/edit',{json:true,body:{"name":"Tom"}},(err,res,body)=>{
            expect(body).toBe('Mr/Miss Tom');
        });
    });
});