const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017';
const db = 'hello_messages';

// get messages
const fetchMessages = (callback)=>{
    MongoClient.connect(dbUrl,(err,client)=>{
        client.db(db).collection('messages').find({},{fields:{_id:0}}).toArray((err,msgs)=>{
               //console.log(data); 
               callback(msgs);
        });
        client.close();
    });
};

// add a new message
const addMessage = (msg,callback)=>{
    MongoClient.connect(dbUrl,(err,client)=>{
        const dbCollection = client.db(db).collection('messages');
        // insert the message into the collection
        dbCollection.insertOne(msg);
        callback(err);
        client.close();
    });
};

const fetchMessage = (msgParam,callback)=>{
    MongoClient.connect(dbUrl,(err,client)=>{
        client.db(db).collection('messages').find({msg:msgParam}).toArray((err,data)=>{
            callback(data);
        });
        client.close();
    });
};
const updateMessage = (msgObj,callback)=>{
    MongoClient.connect(dbUrl,(err,client)=>{
        const dbCollection = client.db(db).collection('messages');
        dbCollection.updateOne({ _id:msgObj.id},
        {$set:{ msg:msgObj.msg }},(err,data)=>{
            callback(err,data);
        });
        client.close();
    });
};
module.exports={
    _all : fetchMessages,
    _add : addMessage,
    _one : fetchMessage,
    _edit : updateMessage
}