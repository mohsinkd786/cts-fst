const express = require('Express');
const app = require('./app');
const server = express();
const parser = require('body-parser');

server.use(parser.json());
server.use(parser.urlencoded({
    extended : true
}));

server.use('/employee-service',app);

// listener port
const port = 4200;
server.listen(port,()=>{
    console.log(`Server started at ${port}`);
});
