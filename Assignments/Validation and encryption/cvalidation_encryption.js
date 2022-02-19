const express = require('express');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

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

// schema for users collection

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    age:{type:Number,
         required:true,
         validate:{
             validator:function(value){
                 if(value>=18){
                     return true;
                 }
                 return false;
             },
             message:function(){
                 return "Age should be greater than or equal to 18";
             }
         }
         }
});

// creating model 

const userModel = new mongoose.model("users",userSchema);

app.post("/users",(req,res)=>{
    let user = req.body;

    // encryption

    bcryptjs.genSalt(10,(err, salt)=>{

        bcryptjs.hash(user.password,salt,(err, enp)=>{

            user.password=enp;

            let userObj = new userModel(user);

            userObj.save()
                .then(()=> {
                    res.send({message:"user added"});
        
                })
                .catch(()=> {
                    res.send({message:"Something wrong"});
        
                        });

        });
    })



    
})

app.listen(8000);