const mongoose = require('mongoose');
const express = require('express');
const app = express();


app.use(express.json());

// establish mongo node connection

mongoose.connect("mongodb://localhost:27017/mongotest")
.then(() => {
    console.log("Connection successfull");
})
.catch((err) => {
    console.log(err);
});

// create a schema  

const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    rating:Number
});

// creating model 

const productModel = new mongoose.model("products",productSchema);

// get api

app.get("/products",(req,res)=> {
    productModel.find()
        .then((products)=> {
            res.send(products);
            
        })
        .catch(()=> {
            
            res.send({message:"Some problem getting data"});
        })
})

// post api

app.post("/products",(req,res)=> {
    let product = req.body;
    
    let productObj = productModel(product);

            productObj.save()
            .then(()=> {
                res.send({message:"products added"});
               
            })
            .catch(()=> {
                res.send({message:"Something wrong"});
                
            });
})


// api to get single data using id 

app.get("/products/:id",(req,res)=> {
    let id = req.params.id;

    productModel.find({_id:id})
        .then((products)=> {
            res.send(products);
            
        })
        .catch(()=> {
            
            res.send({message:"Some problem getting data"});
        })
})

// api for delete product 

app.delete("/products/:id",(req,res)=>{
    let id = req.params.id;

    productModel.deleteOne({_id:id})
        .then(()=> {
            res.send({message:"Deleted"});
            
        })
        .catch(()=> {
            res.send({message:"Something wrong"});
            
        });
})

// api for update product 

app.put("/products/:id",(req,res)=>{
    let id = req.params.id;
    let product = req.body;

    productModel.updateOne({_id:id},product)
    .then(()=> {
        res.send({message:"products updated"});
        
    })
    .catch(()=> {
        res.send({message:"Something wrong"});
       
    })
})






app.listen(8000,()=> {
    console.log("Listening on port 8000...");
})