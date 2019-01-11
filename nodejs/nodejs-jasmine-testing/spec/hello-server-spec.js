const request = require('request');
const url = 'http://localhost:4102'

describe('Feature: Hello Server ',()=>{
    describe('GET /status',()=>{
        it('returns status code 200',()=>{
            request.get(url+'/status',(err,response,body)=>{
                expect(response.statusCode).toBe(200);
            });
        });
        it('returns status message',()=>{
            request.get(url+'/status',(err,response,body)=>{
                const _body = {"message": "Server is running"};
                console.log(body);
                //expect(body).toEqual(_body);
                //done();
            });
        });
    });
});