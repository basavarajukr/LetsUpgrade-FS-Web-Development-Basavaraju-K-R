const express = require('express');
const chatModel = require('../models/chat_model');
const verifyToken = require("../verify_token");

const router = express.Router();

//to create or send a chat
router.post("/",verifyToken,(req, res) => {
    let chat=req.body;

    let chatObj = new chatModel(chat);

    chatObj.save()
    .then(() => {
        res.send({message:"chat sent"})
    })
    .catch(err => {
        console.log(err);
        res.send({message:"error sending chat"})
    })
})

//to fetch a chat or conversation btw 2 people  

router.get("/:user_id/:person_id",verifyToken,async (req, res) => {

    let user_id=req.params.user_id;
    let person_id=req.params.person_id;


    let myChats = await chatModel.find({user_sender:user_id,user_receiver:person_id});

    let personChats = await chatModel.find({user_sender:person_id,user_receiver:user_id})
    
})


module.exports =router;