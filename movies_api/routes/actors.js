const express = require('express');

const router = express.Router();

const {actorModel,moviesActorModel} = require('../schema-model');


// endpoints for actors 

// to create a actor

router.post("/",(req, res)=>{
    let actor = req.body;
    let actorObj = new actorModel(actor);

    actorObj.save()
    .then(()=> {
        res.send({message:"Actor created"})
    })
    .catch((err)=> {
        console.log(err);
        res.send({message:"Some problem"})
    })

})
// to get all actors

router.get("/",(req, res)=>{
    actorModel.find()
    .then((actors)=> {
        res.send(actors);
    })
    .catch((err)=> {
        console.log(err);
        res.send({message:"Some problem"})
    })

})
// to get actor based on _id

router.get("/:id",(req, res)=>{
    let id = req.params.id;

    actorModel.find({_id:id})
    .then((actor)=> {
        res.send(actor);
    })
    .catch((err)=> {
        console.log(err);
        res.send({message:"Some problem"})
    })

})
// to delete a actor

router.delete("/:id",(req, res)=>{
    let id = req.params.id;

    actorModel.deleteOne({_id:id})
    .then(()=> {
        res.send({message:"Actor deleted successfully"});
    })
    .catch((err)=> {
        console.log(err);
        res.send({message:"Some problem"})
    })

})

// to update a actor

router.put("/:id",(req, res)=>{
    let id = req.params.id;
    let actor = req.body;

    actorModel.updateOne({_id:id},actor)
    .then(()=> {
        res.send({message:"Actor updated successfully"});
    })
    .catch((err)=> {
        console.log(err);
        res.send({message:"Some problem"})
    })

})


module.exports = router;