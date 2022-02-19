const express = require('express');

const app = express();

const mongoose = require('mongoose');

// connection to mongodb

mongoose.connect('mongodb://localhost:27017/pms',{useUnifiedTopology: true , useNewUrlParser: true}, () => {
    console.log('connected to mongo db server');
});

// schema for product collection

let productSchema = new mongoose.Schema({
    
        "name": String,
        "price": Number,
        "quantity": Number,
        "color": String,
        "category": String,
        "description": String,
        "rating": Number
    
});

let productionModel = new mongoose.model('products',productSchema);



app.use(express.json());

app.get("/products", async (req,res) => {
    let products = await productionModel.find({"category": "Electronics"});
    res.send(products);
})

app.post('/products', (req,res) => {
    let product = req.body;
    let proObj = new productionModel(product);
    proObj.save();
    res.send('product created');
})

// creating and starting a server

app.listen(3000, () => {
    console.log('sserver is runnning in 3000');
})