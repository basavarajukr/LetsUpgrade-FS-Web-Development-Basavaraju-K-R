// const logger = require('./app.js');

// logger('sharath');

// OS module start

// const os = require('os');

// var totalMemory = os.totalmem();
// var freeMemory = os.freemem();

// console.log(`Total memory: ${totalMemory}`);
// console.log(`Free memory: ${freeMemory}`);

// os module end

// fs module start
// const fs = require('fs');

// fs.readdir('./', function(err , files) {
//     if(err)console.log('error' , err)
//     else 
//         console.log('result', files);
// });
// fs module end

// event module start

// const EventEmitter = require('events');
// const emitter = new EventEmitter();

// emitter.on('logging' , (e) => {
//     console.log('message is logged' , e);
// }) 


// emitter.emit('logging' , 'message_is_logged');

// event module end

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log("connected to mongodb..."))
    .catch((err => console.error("could not connect to mongodb")));