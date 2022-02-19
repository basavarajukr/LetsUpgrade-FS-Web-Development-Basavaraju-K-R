const express = require('express');
const likeModel = require('../models/like_model');
const verifyToken = require('../verify_token');

const router=express.Router();

router.post("/",verifyToken,(req, res) => {
    let like = req.body;

    let likeObj = new likeModel(like);

    likeObj.save()
    .then(() => {
        res.send({message:"like created"});
    })
    .catch(err => {
        console.log(err);
        res.send({message:"something went wrong"});
    })
})

//to dislike a post
router.delete("/:id",verifyToken,(req, res) => {

    let id = req.params.id;

    likeModel.deleteOne({_id:id})
    .then(() => {
        res.send({message:"like deleted"});
    })
    .catch(err => {
        console.log(err);
        res.send({message:"something went wrong"});
    })
})

module.exports =router;