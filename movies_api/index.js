const express = require('express');
const mongoose = require('mongoose');
const {movieModel,actorModel,moviesActorModel} = require('./schema-model');
const cors = require('cors');

const app = express();

const moviesRouter = require('./routes/movies');
const actorsRouter = require('./routes/actors');

// middleware function to extract data  and give us the body property  in request object
app.use(express.json());

app.use(cors());



// mongodb connection 
mongoose.connect("mongodb://localhost:27017/movies-api")
.then(()=> {console.log("Connection established")})
.catch((err)=> {console.log("Error connecting")})





app.use("/movies",moviesRouter);
app.use("/actors",actorsRouter);





app.listen(8000);