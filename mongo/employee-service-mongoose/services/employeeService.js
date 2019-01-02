// import the mongoose library
const mongoose = require('mongoose');
// connect to mongodb
mongoose.connect('mongodb://localhost:27017/organization');
//
const Schema = mongoose.Schema;
const address = new Schema({
    _id : Number,
    city : String,
    state : String,
    zip : Number
});
const employeeSchema = new Schema(
    {
        _id:{
            type: Number,
            min : [1,'Please keep Id above 1'],
            max : [100,'Please keep the Id below 100'],
            required : [true,'Id cannot be left blank']
        },
        name:{
            type: String,
            required: [true,'Name Cannot be left blank']
        },
        phone:Number,
        email:{
            type: String,
            trim: true,
            required: [true,'Email cannot be left blank'],
            match: [	
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Invalid Email Specified']  
        },
        salary:Number,
        addresses: [address]
    });
const EmployeeModel = mongoose.model('employee',employeeSchema);

const fetchAll= (callback)=>{
    EmployeeModel.find({},{__v:0},(err,data)=>{
        callback(err,data);
    });
}
// fetch by email
const fetchByEmail = (email,callback)=>{
    EmployeeModel.find({email:email},{__v:0},(err,data)=>{
        callback(err,data);
    })
} 
// fetch all those with salary greater than
const fetchBySalaryGreater = (salary,callback)=>{
    EmployeeModel.find({salary:{$gte:salary}},{__v:0},(err,data)=>{
        callback(err,data);
    })
}
// add an employee
const addEmployee = (emp,callback)=>{
    const eObj = new EmployeeModel({ _id:emp._id,name: emp.name,email:emp.email,salary:emp.salary });
    EmployeeModel.create(eObj,(err,response)=>{
        callback(err);
    });
}
// update an employee
const updateEmployee = (emp,callback)=>{
    EmployeeModel.updateMany({_id:emp._id},{name: emp.name,email:emp.email,salary:emp.salary},(err,response)=>{
        callback(err,response);
    });
}
// delete an employee by email
const deleteByEmail = (email,callback)=>{
    EmployeeModel.deleteOne({email:email},(err,response)=>{
        callback(err,response);
    });
}
// fetch employees by state
const fetchByState = (state,callback)=>{
    EmployeeModel.find({"addresses.state": state },{__v:0},(err,data)=>{
        callback(err,data);
    })
}
// fetch employees by city
const fetchByCity = (city,callback)=>{
    EmployeeModel.find({"addresses.city": city },{__v:0},(err,data)=>{
        callback(err,data);
    })
}
// fetch employees by zip code
const fetchByZipCode = (zip,callback)=>{
    EmployeeModel.find({"addresses.zip": zip },{__v:0},(err,data)=>{
        callback(err,data);
    })
}
module.exports={
    _all : fetchAll,
    _byEmail : fetchByEmail,
    _bySalaryGreater : fetchBySalaryGreater,
    _add : addEmployee,
    _update : updateEmployee,
    _delByEmail : deleteByEmail,
    _byCity : fetchByCity,
    _byState : fetchByState,
    _byZip : fetchByZipCode 
}