const express = require('express');
const verifyToken = require('../verify_token');
const connectionModel = require('../models/connection_model');
const userModel = require('../models/user_model');

const router = express.Router();

//follow logic
router.post("/follow",verifyToken,(req, res) => {
    let connection =req.body;

    userModel.findOne({_id:connection.followed_id})
    .then((user)=>{
        if(user.private===true){
            connection.status = 1;
        }

        let connectionObj = new connectionModel(connection);

        connectionObj.save()
        .then(() => {
            res.send({message:"follow successfull"});
        })
        .catch((err) => {
            console.log(err);
            res.send({message:"something went wrong"});
        })
    })

})

//to update or accept a connection
router.put("/:id",verifyToken,(req, res) => {

    let id = req.params.id;
    let newConnectionData=req.body;
    connectionModel.updateOne({_id:id,newConnectionData})
    .then(() => {
        res.send({message:"request accepted"});
    })
    .catch((err) => {
        console.log(err);
        res.send({message:"something went wrong"});
    })
})


//to delete or unfollow the connection
router.delete("/:id",verifyToken,(req, res)=>{

    let id=req.params.id;
    connectionModel.deleteOne({_id:id})
    .then(() => {
        res.send({message:"unfollow successfull"});
    })
    .catch((err) => {
        console.log(err);
        res.send({message:"something went wrong"});
    })
})

// to fetch all followers and following for a user
router.get("/:user_id",verifyToken,(req, res)=>{
    let id = req.params.user_id;
    let followers =[];
    let following=[];

    connectionModel.find({followed_id:id,status:0}).populate('follower_id')
    .then((data) => {
        followers=data;
    })
    .catch((err) => {
        console.log(err);
    })

    connectionModel.find({follower_id:id,status:0}).populate('followed_id')
    .then((data) => {
        following=data;
    })
    .catch((err) => {
        console.log(err);
    })

    let response={followers:followers,following:following};

    res.send(response);

})

module.exports = router;