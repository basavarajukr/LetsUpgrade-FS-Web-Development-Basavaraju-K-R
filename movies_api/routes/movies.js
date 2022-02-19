const express = require('express');

const router = express.Router();

const {movieModel,moviesActorModel} = require('../schema-model');



// endpoints for movies

// create movies

router.post("/",(req,res)=> {
    let movie = req.body;
    let movieObj = new movieModel(movie);

    movieObj.save()
    .then(()=> {
        res.send({message:"Movie created"})
    })
    .catch((err)=> {
        console.log(err);
        res.send({message:"Some problem"})
    })
});

// to fetch actor based on movie id

router.get("/actors/:movie_id",(req, res)=> {
    let movie_id = req.params.movie_id;

    moviesActorModel.find({movie_id: movie_id}).populate('actor_id')
    .then((data)=> {
        res.send(data);
    })
    .catch((err)=> {
        console.log(err);
        res.send({message:("Some problem")});
    })
})

// to fetch movies based on actor _id

router.get("/actor/:actor_id",(req, res)=> {
    let actor_id = req.params.actor_id;

    moviesActorModel.find({actor_id: actor_id}).populate('actor_id').populate('movie_id')
    .then((data)=> {
        res.send(data);
    })
    .catch((err)=> {
        console.log(err);
        res.send({message:("Some problem")});
    })
})

// to add cast to a movie

router.post("/actors",(req,res)=> {
    let movies_actors = req.body;
    movies_actorsObj = new moviesActorModel(movies_actors);

    movies_actorsObj.save()
    .then(()=> {
        res.send({message:"Movie actor created"})
    })
    .catch((err)=> {
        console.log(err);
        res.send({message:"Some problem"})
    })
});


// get movies 

router.get("/",(req,res)=> {
    movieModel.find()
    .then((movies)=> {
        res.send(movies);
    })
    .catch((err)=> {
        console.log(err);
        res.send({message:"Some problem"})
    })
})

// get movie based on id 

router.get("/:id",(req,res)=> {
    let id = req.params.id;

    movieModel.findOne({_id:id})
    .then((movies)=> {
        res.send(movies);
    })
    .catch((err)=> {
        console.log(err);
        res.send({message:"Some problem"})
    })
});

// get movie based on productionCompany

router.get("/production/:pcom",(req,res)=> {
    let pcom = req.params.pcom;

    movieModel.find({productionCompany:pcom})
    .then((movie)=> {
        res.send(movie);
    })
    .catch((err)=> {
        console.log(err);
        res.send({message:"Some problem"})
    })
});

// get movie based on genre

router.get("/genre/:genre",(req,res)=> {
    let genre = req.params.genre;

    movieModel.find({genre:genre})
    .then((movie)=> {
        res.send(movie);
    })
    .catch((err)=> {
        console.log(err);
        res.send({message:"Some problem"})
    })
});


// to delete a movie 

router.delete("/:id",(req,res)=>{
    let id = req.params.id;

    movieModel.deleteOne({_id:id})
    .then(()=> {
        res.send({message:"Movie deleted"});
    })
    .catch((err)=> {
        console.log(err);
        res.send({message:"Some problem"})
    })

})

// to update a movie

router.put("/:id",(req,res)=>{
    let id = req.params.id;
    let movie = req.body;

    movieModel.updateOne({_id:id},movie)
    .then(()=> {
        res.send({message:"Movie updated"});
    })
    .catch((err)=> {
        console.log(err);
        res.send({message:"Some problem"})
    })

})


module.exports= router;