const express = require('express');
const server = express();
const parser = require('body-parser');
const employeeService = require('./services/employeeService');

server.use(parser.json());
server.use(parser.urlencoded({
    extended : true
}));
// status service
server.get('/status',(req,res)=>{
    res.send('Service is running \n');
});

//fetch all employees
server.get('/employees',(req,res)=>{
    res.setHeader('content-type','application/json');
    employeeService._all((err,data)=>{
        if(err)
            res.statusCode(400).end('Unable to fetch the employees');
        else
            res.end(JSON.stringify(data));
    });
});

// fetch by email
server.get('/employees/findByEmail/:email',(rq,rs)=>{
    rs.setHeader('content-type','application/json');
    const email = rq.params.email;
    employeeService._byEmail(email,(err,data)=>{
        if(err)
            rs.end(JSON.stringify({ message : 'Unable process the request', errorCode: 400}));
        else
            rs.end(JSON.stringify(data));
 
    });
});

// fetch all with salary greater than
server.get('/employees/findBySalaryGreater/:salary',(rq,rs)=>{
    rs.setHeader('content-type','application/json');
    const salary = rq.params.salary;
    employeeService._bySalaryGreater(salary,(err,data)=>{
        if(err)
            rs.end(JSON.stringify({ message : 'Unable process the request', errorCode: 400}));
        else
            rs.end(JSON.stringify(data));
 
    });    
});

// update employee by id
server.put('/employees/update',(rq,rs)=>{
    rs.setHeader('content-type','application/json');
    const empObj = rq.body;
    employeeService._update(empObj,(err,response)=>{
        if(err)
            rs.end(JSON.stringify({ message : 'Unable to update the employee', errorCode: 400}));
        else
            rs.end(JSON.stringify({ message : 'Employee Modified Successfully'}));
    });
});

// Add an employee
server.post('/employees/add',(rq,rs)=>{
    rs.setHeader('content-type','application/json');
    const empObj = rq.body;
    employeeService._add(empObj,(err)=>{
        if(err)
            rs.end(JSON.stringify({ message : 'Unable to add the employee', errorCode: 400}));
        else
            rs.end(JSON.stringify({ message : 'Employee Added Successfully'}));
    })
});

// delete an employee by email
server.post('/employees/delete/:email',(rq,rs)=>{
    
});
// listener port
const port = 4211;
server.listen(port,()=>{
    console.log(`Server started at ${port}`);
});