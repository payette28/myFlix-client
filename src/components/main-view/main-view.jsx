import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';


export const MainView = () => {
	const storedToken = localStorage.getItem('token');
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const [movies, setMovies] = useState([]);

	const [selectedMovie, setSelectedMovie] = useState(null);
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);

	useEffect(() => {
		if (!token) {
			return;
		}
		fetch('https://movies-flix-payette-cee376d48a23.herokuapp.com/movies', {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				const moviesFromApi = data.map((movie) => {
					return {
						_id: movie.id,
						title: movie.title,
						imagePath: movie.imagePath,
						description: movie.description,
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
		}, [user, token]);
	
	if (!user) {
		return (
			<>
				<LoginView onLoggedIn={(user, token) => {
					setUser(user);
					setToken(token);
				}} />
				or
				<SignupView />
			</>
		);
	}

	if (selectedMovie) {
		return (
			<MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
		);
	}

	if (movies.length === 0) {
		return <div>The list is empty!</div>
	}

	return (
		<div>
			<button
				onClick={() => {
					setUser(null);
					setToken(null);
					localStorage.clear();
				}}
			>Logout</button>
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