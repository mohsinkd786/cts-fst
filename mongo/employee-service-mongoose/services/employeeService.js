// import the mongoose library
const mongoose = require('mongoose');
// connect to mongodb
mongoose.connect('mongodb://localhost:27017/organization');
//
const Schema = mongoose.Schema;
const employeeSchema = new Schema({_id:Number,name:String, phone:Number, email:String, salary:Number});
const EmployeeModel = mongoose.model('employee',employeeSchema);

const fetchAll= (callback)=>{
    EmployeeModel.find({},(err,data)=>{
        callback(err,data);
    });
}
// fetch by email
const fetchByEmail = (email,callback)=>{
    EmployeeModel.find({email:email},(err,data)=>{
        callback(err,data);
    })
} 
// fetch all those with salary greater than
const fetchBySalaryGreater = (salary,callback)=>{
    EmployeeModel.find({salary:{$gte:salary}},(err,data)=>{
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
    EmployeeModel.updateMany({_id:emp._id},{name: emp.name,email:emp.email},(err,response)=>{
        callback(err,response);
    });
}

module.exports={
    _all : fetchAll,
    _byEmail : fetchByEmail,
    _bySalaryGreater : fetchBySalaryGreater,
    _add : addEmployee,
    _update : updateEmployee 
}