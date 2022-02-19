import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';

function Movies(){

    let [movies,setMovies] = useState([]);


    useEffect(() =>{
        fetch("http://localhost:8000/movies/")
        .then((response)=>response.json())
        .then((movieData)=>{
            setMovies(movieData);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])

    return (
        <section className="movies">
            <div className="container movies_container">
                <h1 className="title">Movies</h1>
                <div className="movies_parent">

                    {
                        movies.map((movie, index)=>{
                            return (
                            <div className="movie" key={index}>

                                
                                <img src={movie.poster}></img>
                                
                                <div className="movie_details">
                                    <h2 className="movie_title">{movie.name}</h2>
                                    <p> Release Date : {movie.releaseDate}</p>
                                    <p>Boxoffice : {movie.boxOffice}</p>
                                    <p>Rating : {movie.rating}</p>
                                    <p>Genre : {movie.genre}</p>

                                    <Link to={`/movies/${movie._id}`}>View More</Link>
                                </div>
                            </div>

                            )
                        })
                    }

                    
                </div>
            </div>
        </section>
    )


}

export default Movies;