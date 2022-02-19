const express = require('express');

const verifyToken = require('../verify_token');
const postModel = require('../models/post_model');
let connectionModel = require('../models/connection_model');

const router = express.Router();


router.post("/",verifyToken,(req, res) => {

    let post = req.body;

    let postObj = new postModel(post);

    postObj.save()
    .then(() => {
        res.send({message:"post created"});
    })
    .catch((err) => {
        console.log(err);
        res.send({message:"something went wrong"});
    })

})

//to delete a post  
router.delete("/:id",verifyToken,(req, res) => {
    let id = req.params.id;

    postModel.deleteOne({_id:id})
    .then(() => {
        res.send({message:"post deleted"});
    })
    .catch((err) => {
        console.log(err);
        res.send({message:"something went wrong"});
    })
}) 

//to update a post
router.put("/:id",verifyToken,(req, res) =>{


    let newPostData = req.body;
    let id =req.params.id;

    postModel.updateOne({_id:id,newPostData})
    .then(() => {
        res.send({message:"post updated"});
    })
    .catch((err) => {
        console.log(err);
        res.send({message:"something went wrong"});
    })


})

//to fetch all the post for a particular whoever is logged in   
router.get("/feeds/:user_id",verifyToken,(req, res)=>{
    let id = req.params.user_id;

    connectionModel.find({followed_id:id,status:0})
    .then((data) => {
        let follower_ids = data.map((connection,index)=>{
            return connection.follower_id;
        })

        let myPost = [];
        let followers_post=[];

        postModel.find({user:id})
        .then((posts)=>{
            myPost=posts;
        })

        postModel.find({user:{$in:follower_ids}})
        .then((posts)=>{
            followers_post=posts;
        })
    })
    .catch((err) => {
        console.log(err);
    })

})

module.exports =router;