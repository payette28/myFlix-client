import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DeleteProfileModal from './delete-profile';
import  FavoriteMovies  from './favorite-movies.jsx'

export const ProfileView = ({ onDelete, movies }) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');


    const updateUserInfo = (event) => {
        event.preventDefault();

        const inputData = {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        };
        console.log('inputData: ', inputData);

        fetch(`https://movies-flix-payette-cee376d48a23.herokuapp.com/users/${storedUser.username}`, {
            method: 'PUT',
            body: JSON.stringify(inputData),
            headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                alert('User update successful.');
                console.log('User updated: ', inputData);
                fetchUpdatedUser(inputData.username)
            } else {
                alert('User update failed.');
            }
        });
    };

    const fetchUpdatedUser = (newUsername) => {
        fetch(`https://movies-flix-payette-cee376d48a23.herokuapp.com/users/${newUsername}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    localStorage.setItem('user', JSON.stringify(data));
                    console.log('Local storage updated: ', data)
                    window.location.reload();
                } else {
                    alert('Local storage update failed.');
                }
            });
    }

    return (

        <Col>
             <Row>
                <Col>
                    <Row> 
                        <h1>User Profile</h1>
                        <div>
                            <span>Username: </span>
                            <span>{storedUser.username}</span>
                        </div>
                        <div>
                            <span>Email: </span>
                            <span>{storedUser.email}</span>
                        </div>
                        <div>
                            <span>Date of Birth: </span>
                            <span>{storedUser.birthday.slice(0, 10)}</span>
                        </div>
                    </Row>
                    <Row> 
                        <h3>Delete your profile?</h3>
                        <DeleteProfileModal onDelete={onDelete} />
                    </Row>
                </Col>
                <Col> 
                    <h3>Update User Information</h3>
                    <Form onSubmit={updateUserInfo}>
                        <Form.Group controlId='formUsername'>
                            <Form.Label>Username: </Form.Label>
                            <Form.Control
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                minLength='5'
                            />
                        </Form.Group>

                        <Form.Group controlId='formPassword'>
                            <Form.Label>Password: </Form.Label>
                            <Form.Control
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='formEmail'>
                            <Form.Label>Email: </Form.Label>
                            <Form.Control
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='formBirthDate'>
                            <Form.Label>Birthday: </Form.Label>
                            <Form.Control
                                type='date'
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant='primary' type='submit'>
                            Update
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
            <h1>Favorite Movies</h1>
                <FavoriteMovies movies={movies} />
            </Row>
        </Col>
    );
};