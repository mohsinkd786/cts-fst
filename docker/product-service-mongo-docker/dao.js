const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://mongo';
const db = 'products';
// add a product 
const addProduct= (product,callback)=>{
   MongoClient.connect(url,(err,client)=>{
    const dbCol = client.db(db).collection('items');
    dbCol.insertOne(product);
    callback(err);
    client.close();
   });
}
const fetchProducts = (callback)=>{
    MongoClient.connect(url,(err,client)=>{
        client.db(db).collection('items').find({}).toArray((er,data)=>{
            callback(er,data);
        });
        client.close();
    })
}

module.exports={
    fetchProducts,
    addProduct
}