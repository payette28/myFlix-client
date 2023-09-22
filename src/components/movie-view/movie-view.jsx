import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);

	return (
		<div>
			<div>
				<img src={movie.imagePath} height="300px" />
			</div>
			<div>
				<span>Title: </span>
				<span>{movie.title}</span>
			</div>
			<div>
				<span>Description: </span>
				<span>{movie.description}</span>
			</div>
			<div>
				<span>Genre: </span>
				<span>{movie.genre.name}</span>
			</div>
			<div>
				<span>Director: </span>
				<span>{movie.director.name}</span>
			</div>
			<div>
				<span>Featured: </span>
				<span>{movie.featured}</span>
			</div>
			            <Link to={'/'}>
                <button
                    className='back-button'
                    style={{ cursor: 'pointer' }}
                >
                    Back
                </button>
            </Link>
		</div>
	);
};

MovieView.propTypes = {
	movie: PropTypes.shape({
		imagepath: PropTypes.string.isRequired,
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
	onBackClick: PropTypes.func.isRequired
};