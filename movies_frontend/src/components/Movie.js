import {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';

function Movie(){

    let {id} = useParams();

    let [movie,setMovie] = useState({});

    useEffect(() =>{

        fetch("http://localhost:8000/movies/"+id)
        .then((response) =>response.json())
        .then((movieData)=>{
            setMovie(movieData);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])


    return (
        <section className="movies">
            <div className="container movies_container">
                <h1 className="title">{movie.name}</h1>
                <div className="movie_parent">

                    <img src={movie.poster} alt={movie.name}></img>

                    <div className="single_movie_details">
                        <p>Description : {movie.description}</p>
                        <p> Release Date : {movie.releaseDate}</p>
                        <p>Boxoffice : {movie.boxOffice}</p>
                        <p>Rating : {movie.rating}</p>
                        <p>Genre : {movie.genre}</p>
                    </div>
                    

                    
                </div>
            </div>
        </section>
    )
}

export default Movie;