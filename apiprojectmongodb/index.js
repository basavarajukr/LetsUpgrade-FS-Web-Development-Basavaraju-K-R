const http = require('http');
const mongoose = require('mongoose');
const url = require('url');

// establish mongo node connection

mongoose.connect("mongodb://localhost:27017/mongotest")
.then(() => {
    console.log("Connection successfull");
})
.catch((err) => {
    console.log(err);
});

// create a schema  

const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    rating:Number
});

// creating model 

const productModel = new mongoose.model("products",productSchema);



http.createServer((req,res)=> {

    let path = url.parse(req.url,true);

    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    res.setHeader('Content-Type', 'application/json');
    


    if(req.method === "OPTIONS"){
        res.end();
    }


    

    if(path.pathname === "/products" && req.method === "GET") {

        productModel.find()
        .then((products)=> {
            res.write(JSON.stringify(products));
            res.end();
        })
        .catch((err)=> {
            console.log("Something wrong");
            res.write(JSON.stringify({message:"Some problem getting data"}));
        })
        
    }

    // to create a product

    else if(path.pathname==="/products" && req.method==="POST") {
        let data ='';

        req.on("data",(chunk)=> {
            data+=chunk;
        });

        req.on('end',()=> {

            let product=JSON.parse(data);

            let productObj = productModel(product);

            productObj.save()
            .then(()=> {
                res.write(JSON.stringify({message:"products added"}));
                res.end();
            })
            .catch(()=> {
                res.write(JSON.stringify({message:"Something wrong"}));
                res.end();
            });
            
        })
    }

    // get single data

    else if(path.pathname==="/product" && req.method==="GET"){
        let id = path.query.id;

        productModel.find({_id:id})
        .then((product)=> {
            res.write(JSON.stringify(product));
            res.end();
        })
        .catch(()=> {
            res.write(JSON.stringify({message:"Something wrong"}));
            res.end();
        });

    }

    // delete a product 

    else if(path.pathname==="/products" && req.method==="DELETE") {
        let id = path.query.id;

        productModel.deleteOne({_id:id})
        .then(()=> {
            res.write(JSON.stringify({message:"Deleted"}));
            res.end();
        })
        .catch(()=> {
            res.write(JSON.stringify({message:"Something wrong"}));
            res.end();
        });

    }

    // updating the product 

    else if(path.pathname==="/products" && req.method==="PUT") {
        let id = path.query.id;

        let data ='';

        req.on("data",(chunk)=> {
            data+=chunk;
        });

        req.on('end',()=> {

            let product=JSON.parse(data);

            productModel.updateOne({_id:id},product)
            .then(()=> {
                res.write(JSON.stringify({message:"products updated"}));
                res.end();
            })
            .catch(()=> {
                res.write(JSON.stringify({message:"Something wrong"}));
                res.end();
            });
        
            
        })
    }
}).listen(8000);