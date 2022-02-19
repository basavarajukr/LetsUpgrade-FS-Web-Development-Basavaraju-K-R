const express = require('express');

const router = express.Router(); 

router.get("/",(req,res)=>{
    res.send("c get route")
});

router.post("/",(req,res)=>{
    res.send("c post route")
});

router.put("/:id",(req,res)=>{
    res.send("c put route")
});

router.delete("/:id",(req,res)=>{
    res.send("c delete route")
});

module.exports = router;