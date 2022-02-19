const mongoose = require('mongoose');

// schema for movies collection 

const movieSchema =new mongoose.Schema({
    name:{type:String,required:true},
    releaseDate:String,
    boxOffice:Number,
    poster:String,
    rating:{type:Number,max:10,min:1,required:true},
    productionCompany:String,
    description:{type:String,maxlength:100,minlength:5},
    genre:{type:String,enum:["Action","Sci-fi","Drama"]}
});

// schema for actors collection

const actorSchema =new mongoose.Schema({
    name:String,
    age:Number,
    country:String,
    height:Number,
    weight:Number,
    pic:String
});

// schema for movies_actors collection

const moviesActorSchema = new mongoose.Schema({
    movie_id:{type:mongoose.Schema.Types.ObjectId,ref:"movies"},
    actor_id:{type:mongoose.Schema.Types.ObjectId,ref:"actors"}
});

// model for movies collection

const movieModel = new mongoose.model("movies",movieSchema);

// model for actor collection

const actorModel = new mongoose.model("actors",actorSchema);

// models for movies_actors

const moviesActorModel = new mongoose.model("movies_actors",moviesActorSchema);

// exporting all models  

const models = {
    movieModel:movieModel,
    actorModel:actorModel,
    moviesActorModel:moviesActorModel
}

module.exports = models;
