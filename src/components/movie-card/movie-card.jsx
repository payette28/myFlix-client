import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FavoriteButton } from '../favorite-button/favorite-button';

export const MovieCard = ({ movie }) => {
	return (
		<Card className='h-100'>
			<Card.Img variant='top' src={movie.imagePath} />
			<Card.Body>
				<Card.Title>
					{movie.title}
				</Card.Title>
				<Card.Text>
					{movie.director.name}
					{movie.genre.name}
				</Card.Text>
				<Link to={`/movies/${encodeURIComponent(movie.id)}`}>
					<Button variant='link'>
						See More
					</Button>
				</Link>
				<FavoriteButton movie={movie} />
			</Card.Body>
		</Card>
	);
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
		imagePath: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		genre: PropTypes.shape({
			name: PropTypes.string.isRequired
		}),
		description: PropTypes.string.isRequired,
		director: PropTypes.shape({
			name: PropTypes.string.isRequired
		}),
		featured: PropTypes.string.isRequired
	}).isRequired,
};