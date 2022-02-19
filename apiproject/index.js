let fs = require('fs'); 
let http = require('http');
let url = require('url');



http.createServer((req,res)=> {

    let products = JSON.parse(fs.readFileSync("data.json", {encoding: 'utf8'}));

    let path =  url.parse(req.url,true);
    

    if(path.pathname==='/products' && req.method==='GET'){

        // let id = path.query.id;

        // if(id===undefined){
        //     res.writeHead(200,{"Content-Type": 'application/json'});
        //     res.write(JSON.stringify(products));
        //     res.end()
        // }
        // else {
        //     let product = products.find(product => product.id===Number(id));
        //     res.writeHead(200,{"Content-Type": 'application/json'});
        //     res.write(JSON.stringify(product));
        //     res.end()
        // }
        let type = path.query.type;
        if ( type === 'Electronics'){
            let product = products.filter(product => product.type === type);
                res.writeHead(200,{"Content-Type": 'application/json'});
                res.write(JSON.stringify(product));
                res.end()
        };

        
    
    }

    else if(path.pathname==="/products" && req.method==='DELETE'){
        let id = Number(path.query.id);
        let index = products.findIndex(product => product.id===id);
        products.splice(index,1);
        fs.writeFileSync("data.json",JSON.stringify(products));
        res.writeHead(200,{"Content-Type": 'application/json'});
        res.write(JSON.stringify({message:"product deleted"}));
        res.end()

    }

    else if(path.pathname==="/products" && req.method==='POST'){

        let data="";
        
        req.on('data',(chunk)=> {
            data+=chunk;
        });

        req.on('end',()=>{

            let lastId = products[products.length-1].id;
            let product = JSON.parse(data);
            product.id = lastId+1;
            products.push(product);
            fs.writeFileSync("data.json",JSON.stringify(products));
            
        });
        res.writeHead(200,{"Content-Type": 'application/json'});
            res.write(JSON.stringify({message:"product added"}));
            res.end();
    }



    else if(path.pathname==="/products" && req.method=="PUT"){
        let id = Number(path.query.id);
        let index = products.findIndex(product => product.id ===id);

        let data ="";

        req.on('data',(chunk)=> {
            data+=chunk;
        });

        req.on('end',()=>{
                let newProduct = JSON.parse(data);
                newProduct.id = id;
    
                products[index] = newProduct;
                fs.writeFileSync("data.json",JSON.stringify(products));
                res.writeHead(200,{"Content-Type": 'application/json'});
                res.write(JSON.stringify(products[index]));
                res.end();

           
            
        });

    }

}).listen(8000);

