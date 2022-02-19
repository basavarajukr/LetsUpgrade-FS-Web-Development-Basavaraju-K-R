const express = require('express');

const router = express.Router();

router.get("/",(req,res)=>{
    res.send("p get route")
});

router.post("/",(req,res)=>{
    res.send("p post route")
});

router.put("/:id",(req,res)=>{
    res.send("p put route")
});

router.delete("/:id",(req,res)=>{
    res.send("p delete route")
});

module.exports = router;