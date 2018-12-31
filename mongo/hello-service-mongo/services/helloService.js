const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017';
const db = 'hello_messages';
// get messages
const fetchMessages = (callback)=>{
    MongoClient.connect(dbUrl,(err,client)=>{
        client.db(db).collection('messages').find({msg:"Hey"},{fields:{_id:0}}).toArray((err,msgs)=>{
               //console.log(data); 
               callback(msgs);
        });
        client.close();
    });
};

module.exports={
    _all : fetchMessages
}