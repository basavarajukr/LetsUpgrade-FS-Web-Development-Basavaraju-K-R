const express = require('express');

const commentModel=require("../models/comment_model");
const verifyToken= require("../verify_token");

const router = express.Router();

//to create a new comment

router.post("/",verifyToken,(req, res) => {
    let comment = req.body;

    let commentObj = new commentModel(comment);

    commentObj.save()
    .then(() => {
        res.send({message:"comment created"})
    })
    .catch(err => {
        console.log(err);
        res.send({message:"error creating comment"})
    })
})

//to delete a comment
router.delete("/:id",verifyToken,(req, res) => {
    let id = req.params.id;

    commentModel.deleteOne({_id: id})
    .then(() => {
        res.send({message: "Comment deleted"})
    })
    .catch(err => {
        console.log(err);
        res.send({message:"something wrong"})
    })
})

module.exports = router;