const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const userModel = require("./models/user_model");
const jsonwebtoken = require('jsonwebtoken');
const { JsonWebTokenError } = require('jsonwebtoken');

const app = express();

//middleware settings
app.use(express.json());
app.use(cors());

//mongo connection

mongoose.connect("mongodb://localhost:27017/auth")
.then(()=> console.log("Mongo connection established"))
.catch(()=> console.log("Problem"));

app.post("/users",(req, res) => {

    let user = req.body;

    bcryptjs.genSalt(10,(err,salt)=> {
        bcryptjs.hash(user.password,salt,(err,enp_pwd)=> {
            user.password = enp_pwd;

            let userObj = new userModel(user);

            userObj.save()
            .then(()=>{
                res.send({message: "User saved"});
            })
            .catch((err)=> {
                console.log(err);
                res.send({message: "some problem"});
            })
                })
    })


})

//login endpoint

app.post("/user/login",(req, res)=>{
    let userCred = req.body;

    userModel.findOne({username: userCred.username})
    .then((user)=>{
        if (user!=null){

            bcryptjs.compare(userCred.password,user.password,(err,result)=>{
                if(result!=true){
                    res.send({message: "user found but password is incorrect"});
                }
                else{

                    jsonwebtoken.sign(userCred,"authdemo",(err,token)=>{
                        res.send({message: "auth successful",token:token});
                    })
                    
                }
            })

        }
        else{
            res.send({message: "User not found"});
        }
        
    })
    .catch((err)=>{
        console.log(err);
        res.send({message: "some problem"});
    })
})


app.listen(8000);