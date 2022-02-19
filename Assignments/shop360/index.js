const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// connection to mongo 
mongoose.connect('mongodb://localhost:27017/shop360',{useNewUrlParser: true , useUnifiedTopology: true}, () => {
    console.log('mongodb is connected');
});

// schema  users
const userSchema = new mongoose.Schema({ 
    name:String,
    email: {type:String, unique:true},
    password: String,
    age: Number
},{
    timestamps:true
});

// model users
const userModel = new mongoose.model('users',userSchema);

// schema categories 
const categorySchema = new mongoose.Schema({
    name:String
},{
    timestamps:true
});

// category model 
const categoryModel = new mongoose.model('categories',categorySchema);


// products schema 
const productSchema = new mongoose.Schema({
    name:String,
    price: Number,
    desc:String,
    color:String,
    rating:Number,
    category: {type:mongoose.Schema.Types.ObjectId,ref:'categories'}
},{
    timestamps:true
});

// product model 
const productModel = new mongoose.model('products',productSchema);

// using middleware 
app.use(express.json());

// routes users
app.post("/users/login", async(req, res) => {
    let userDetails = req.body;
    let count = await userModel.find(userDetails).countDocuments();
    if(count===1){
        jwt.sign({user:userDetails},"secretkey",(err,token)=>{
            if(err===null){
                res.send({token:token});
            }
        
    else {
        res.send({message: 'unable to generate token'});
    }
    })}
});


app.post("/users/register", (req,res) => {

    let user = req.body;
    let userObj = new userModel(user);
    userObj.save().then(() => {
        res.send({message: "user created"});
    }).catch((err) => {
        console.log(err);
        res.send({message: "some problem occured"});
    });
});


// category routes 

// insert 

app.post('/categories',verifyToken,(req,res) => {
    let category = req.body;
    let categoryObj = new categoryModel(category);
    categoryObj.save().then(() => {
        res.send({message: "category created"});
    }).catch((err) => {
        console.log(err);
        res.send({message: "some problem occured"});
    });
})

// fetch 
app.get('/categories', verifyToken,async(req,res) => {
    let categories = await categoryModel.find();
    res.send({categories: categories});
})



// routes products 

app.post("/products", verifyToken,(req,res) => {

    let product = req.body;
    let productObj = new productModel(product);
    productObj.save().then(() => {
        res.send({message: "product created"});
    }).catch((err) => {
        console.log(err);
        res.send({message: "some problem occured"});
    });
});

// fetch 
app.get("/products",verifyToken,async (req,res) => {
    let products = await productModel.find().populate('category');
    res.send({products: products});
})

// delete products 
app.delete("/products/:id",verifyToken,(req,res) => {
    let id = req.params.id;
    productModel.deleteOne({_id:id})
    .then(()=>{
        res.send({message: "product deleted"});
    })
    .catch((err) =>{
        console.log(err);
        res.send({message : "problem"});
    })
});

// update products 
app.put("/products/:id",verifyToken,(req,res) => {
    let id = req.params.id;
    let productToUpdate = req.body;
    productModel.updateOne({_id:id},{$set:productToUpdate})
    .then(()=>{
        res.send({message: 'product updated'});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message: 'problem'});
    });
});

// custom middleware 
function verifyToken(req, res, next) {

    if(req.headers.authorization!==undefined){
    let token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, "secretkey", (err,userCredentials)=>{
        if(err===null){
             next();
        }else {
            res.send("cannot verify the token");
        }
    });
}else{
    res.send("please authenticate yourself first");
}
}


// creating and starting server
app.listen(8000, ()=>{
    console.log('server is running in port 8000...');
});

