import {useState} from 'react';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';


export const MainView = () => {
	const [movies, setMovies] = useState([
		{
			id: 1, 
			title:'Avatar',
			description: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
			genre: 'Sci-Fi',
			director: 'James Cameron',
			image: 'https://www.themoviedb.org/t/p/original/kyeqWdyUXW608qlYkRqosgbbJyK.jpg'
		},
		{
			id: 2, 
			title: 'Avengers: Endgame',
			description: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.',
			genre: 'Sci-Fi',
			director: 'Anthony Russo',
			image: 'https://www.themoviedb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg'
		},
		{
			id: 3, 
			title: 'The Lion King',
			description: 'After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.',
			genre: 'Adventure',
			director: 'Jon Favreau',
			image: 'https://www.themoviedb.org/t/p/original/dzBtMocZuJbjLOXvrl4zGYigDzh.jpg'
		},
		{
			id: 4, 
			title: 'Titanic',
			description: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
			genre: 'Drama',
			director: 'James Cameron',
			image: 'https://www.themoviedb.org/t/p/original/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg'
		},
	]);

	const [selectedMovie, setSelectedMovie] = useState(null);

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
					key={movie.id} 
					movie={movie}
					onMovieClick={(newSelectedMovie) => {
						setSelectedMovie(newSelectedMovie);
					}}
				/>
      ))}
		</div>
	);
};