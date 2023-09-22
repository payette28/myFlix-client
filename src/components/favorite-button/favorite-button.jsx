import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

export const FavoriteButton = ({ movie }) => {
    const storedToken = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    const [user, setUser] = useState(storedUser);
    const [buttonText, setButtonText] = useState('');
    const [buttonVariant, setButtonVariant] = useState('');

    const isFav = () => {

        let userFavs = storedUser.favoriteMovies;

        if (userFavs.includes(movie.id)) {
            return (true);
        } else {
            return (false);
        }
    }

    useEffect(() => {
        if (isFav() === true) {
            setButtonText('- Fav');
            setButtonVariant('secondary');
        } else {
            setButtonText('+ Fav');
            setButtonVariant('primary');
        }
    }, [user])

    const handleFavorite = () => {
        let fetchMethod = (() => { // returns DELETE or POST
            if (isFav() === true) {
                return 'DELETE';
            } else {
                return 'POST';
            }
        })();


        fetch(`https://movies-flix-payette-cee376d48a23.herokuapp.com/users/${user.username}/movies/${movie.id}`, {
            method: fetchMethod,
            headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((userData) => {
                if (userData) {
                    localStorage.setItem('user', JSON.stringify(userData));
                    setUser(userData);
                    console.log('Local storage update made using the', fetchMethod, 'method:', userData)
                } else {
                    alert('Local storage update failed.');
                }
            });
    };

    return (
        <>
            <Button variant={buttonVariant} onClick={handleFavorite}>
                {buttonText}
            </Button>
        </>
    )
} 