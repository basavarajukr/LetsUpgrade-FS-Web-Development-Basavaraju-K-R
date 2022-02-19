const express = require('express');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const nodemailer = require('nodemailer');

//model import
const userModel=require('../models/user_model');
const verifytoken = require("../verify_token");

const router=express.Router();

//user creation endpoint
router.post("/",(req, res) => {

    let user=req.body;

    bcryptjs.genSalt(10,(err,salt)=>{
        bcryptjs.hash(user.password,salt,(err,enc_password)=>{

            if(err===null){
                user.password=enc_password;

                let userObj = new userModel(user);

                userObj.save()
                .then(()=>{
                    res.send({message:"user created"})
                })
                .catch((err)=>{
                    console.log(err);
                    res.send({message:"something wrong"})
                })
            }
        })
    })
})

//user login endpoint
router.post("/login", (req, res)=>{
    let userCreds=req.body;

    userModel.findOne({username:userCreds.username})
    .then((user)=>{
        if(user!==null){
            bcryptjs.compare(userCreds.password,user.password,(err,login)=>{
                if(err===null){
                    if(login===true){
                        jsonwebtoken.sign(userCreds,"secretcode",(err,token)=>{
                            if(err===null){
                                res.send({token:token});
                            }
                        })
                    }
                    else{
                        res.send({message:"incorect password"})
                    }
                }
            })
        }
        else{
            res.send({message:"incorrect username"})
        }
    })
    .catch((err)=>{
        console.log(err);
        res.send("something wrong");
    })
})


//forgetpassword reset password

router.get("/forgetpassword/:email",(req, res)=>{
    let email = req.params.email;
    let transport =nodemailer.createTransport({
        service:"gmail",
        auth: {
            user:"mailid@gmail.com",
            pass:"password"
        }
    })

    jsonwebtoken.sign(email,"emailtoken",(err,token)=>{

    })

    let mailData = {
        from:"mailid@gmail.com",
        to:email,
        subject:"Password reset",
        text:"https://www.somesites.com/resetpassword/"+token,
        html:`div style="height:200px;width:200px;background-color:skyblue;text-align:center;line-height:200px;color:white;font-size:60px;font-family:calibri">Reset Link</div>`

    }
    transport.sendMail(mailData,(error,info)=>{
        if(error!=null){
            console.log(error);
            res.send({message:"problem while sending email"});
        }
        else{
            res.send({message:"reset link sent successfully"});
        }
    })

})

router.post("/resetpassword/:token",(req, res)=>{

    let newpassword = req.body;
    jsonwebtoken.verify(req.params.token,"emailtoken",(err,email)=>{
        //update password here by writing updating model
    })
})




module.exports=router;