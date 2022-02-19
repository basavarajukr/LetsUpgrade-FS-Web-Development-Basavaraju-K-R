const fs = require('fs');
const express = require('express');

const app = express();

// fs.readFile("./data.txt",{encoding:"utf-8"},(err, data) => {
//     console.log(data);
// })

let readStream = fs.createReadStream("./data.txt",{encoding:"utf-8"});

let writeStream = fs.createWriteStream("./writedata.txt")

// readStream.on("data",(chunk) => {
//     console.log(chunk);
//     console.log("chunck received--------------------------------");

//     writeStream.write(chunk);
// })



app.get("/getdata",(req, res) => {
    readStream.pipe(res);
})

app.listen(8000);