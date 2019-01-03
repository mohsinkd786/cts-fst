const express = require('express');
const app = express();
const router = express.Router();
//const server = express();
const employeeService = require('./services/employeeService');

// status service
router.get('/status',(req,res)=>{
    res.send('Service is running \n');
});

//fetch all employees
router.get('/employees',(req,res)=>{
    res.setHeader('content-type','application/json');
    employeeService._all((err,data)=>{
        if(err)
            res.statusCode(400).end('Unable to fetch the employees');
        else
            res.end(JSON.stringify(data));
    });
});

// fetch by email
router.get('/employees/findByEmail/:email',(rq,rs)=>{
    rs.setHeader('content-type','application/json');
    const email = rq.params.email;
    employeeService._byEmail(email,(err,data)=>{
        if(err)
            rs.end(JSON.stringify({ message : 'Unable process the request', errorCode: 400}));
        else
            rs.end(JSON.stringify(data));
 
    });
});
// fetch by city
router.get('/employees/findByCity/:city',(rq,rs)=>{
    rs.setHeader('content-type','application/json');
    const city = rq.params.city;
    employeeService._byCity(city,(err,data)=>{
        if(err)
            rs.end(JSON.stringify({ message : 'Unable process the request', errorCode: 400}));
        else
            rs.end(JSON.stringify(data));
 
    });
});
// fetch by State
router.get('/employees/findByState/:state',(rq,rs)=>{
    rs.setHeader('content-type','application/json');
    const state = rq.params.state;
    employeeService._byState(state,(err,data)=>{
        if(err)
            rs.end(JSON.stringify({ message : 'Unable process the request', errorCode: 400}));
        else
            rs.end(JSON.stringify(data));
 
    });
});
// fetch by zip
router.get('/employees/findByZip/:zip',(rq,rs)=>{
    rs.setHeader('content-type','application/json');
    const zip = rq.params.zip;
    employeeService._byZip(zip,(err,data)=>{
        if(err)
            rs.end(JSON.stringify({ message : 'Unable process the request', errorCode: 400}));
        else
            rs.end(JSON.stringify(data));
 
    });
});

// fetch all with salary greater than
router.get('/employees/findBySalaryGreater/:salary',(rq,rs)=>{
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
router.put('/employees/update',(rq,rs)=>{
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
router.post('/employees/add',(rq,rs)=>{
    rs.setHeader('content-type','application/json');
    const empObj = rq.body;
    employeeService._add(empObj,(err)=>{
        if(err)
            rs.end(JSON.stringify({ message : 'Unable to add the employee '+ err, errorCode: 400}));
        else
            rs.end(JSON.stringify({ message : 'Employee Added Successfully'}));
    })
});

// delete an employee by email
router.post('/employees/delete/:email',(rq,rs)=>{
    rs.setHeader('content-type','application/json');
    const email = rq.params.email;
    employeeService._delByEmail(email,(err,response)=>{
        if(err)
            rs.end(JSON.stringify({ message : 'Unable to add the employee', errorCode: 400}));
        else
            rs.end(JSON.stringify({ message : 'Employee Deleted Successfully'}));
    });
});
app.route('/login').get((rq,rs)=>{
    rs.send(JSON.stringify({msg:'Please Login'}));
}).post((rq,rs)=>{
    rs.send(JSON.stringify({msg:'Logged In Successfully'}));
})

app.use('/employee-service',router);

// listener port
const port = 4200;
app.listen(port,()=>{
    console.log(`Server started at ${port}`);
});