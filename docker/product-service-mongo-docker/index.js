const express = require('express');
const server = express();
const parser = require('body-parser');
const dao = require('./dao');
server.use(parser.json());
server.use(parser.urlencoded({extended:false}));

// add a product
server.post('/product/add',(req,res)=>{
    dao.addProduct({
        _id: req.body.id,
        name: req.body.name,
        price: req.body.price
    },(err)=>{
        if(err){
            res.status(400).json({
                message : 'Unable to add the product',
                error: err
            });
        }else{
            res.status(200).json({
                message: 'Item added successfully'
            });
        }
    });
});

// get products
server.get('/products',(req,res)=>{
    dao.fetchProducts((err,data)=>{
        if(err){
            res.status(400).json({
                message : 'Unable to add the product',
                error: err
            });
        }else{
            res.status(200).json({
                products: data
            });
        }
    });
});
const PORT = 5233;
server.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
});