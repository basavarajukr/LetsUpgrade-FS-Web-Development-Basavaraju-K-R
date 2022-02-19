const jsonwebtoken = require('jsonwebtoken');

function verifytoken(req, res, next) {
    if(req.headers.authorization!==undefined) {
        let token = req.headers.authorization.split(" ")[1];
        jsonwebtoken.verify(token,"secretcode",(err,userCreds)=>{
            if(err===null){
                next();
            }
            else{
                res.send({message:"invalid token"});
            }
        });
    }
    else{
        res.send({message:"token is required"});
    }
}

module.exports =verifytoken;