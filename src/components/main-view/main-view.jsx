import { useState, useEffect } from 'react';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';


export const MainView = () => {
	const [movies, setMovies] = useState([]);
	
	const [selectedMovie, setSelectedMovie] = useState(null);

	useEffect(() => {
		fetch('https://movies-flix-payette-cee376d48a23.herokuapp.com/movies')
		  .then((response) => response.json())
		  .then((data) => {
			console.log(data);
			const moviesFromApi = data.map((movie) => {
			  return {
				_id: movie.id,
				title: movie.title,
				imagePath: movie.imagePath,
				Description: movie.Description,
				genre: {
				  name: movie.genre.name
				},
				director: {
				  name: movie.director.name
				},
				featured: movie.featured.toString()
			  };
			});
			setMovies(moviesFromApi);
		  });
	  }, []);

	if (selectedMovie) {
		return (
			<MovieView movie={selectedMovie} onBackClick={()=> setSelectedMovie(null)}/>
		);
	}

	if (movies.length === 0) {
		return <div>The list is empty!</div>
	}

	return (
		<div>
			{movies.map((movie) => (
        <MovieCard 
					key={movie.title} 
					movie={movie}
					onMovieClick={(newSelectedMovie) => {
						setSelectedMovie(newSelectedMovie);
					}}
				/>
      ))}
		</div>
	);
};