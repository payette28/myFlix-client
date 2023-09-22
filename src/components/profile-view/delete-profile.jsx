import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteProfileModal({ onDelete }) {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteProfile = () => {
        fetch(`https://movies-flix-payette-cee376d48a23.herokuapp.com/users/${storedUser.username}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                handleClose();
                alert('User deleted successfully.');
                window.location.reload();
                onDelete();
            } else {
                alert('User deletion failed.');
            }
        });
    };



    return (
        <Col>
            <Button variant='primary' onClick={handleShow}>
                Delete 
            </Button>

            <Modal
                size='sm'
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        No
                    </Button>
                    <Button variant='primary' onClick={deleteProfile}>
                        DELETE
                    </Button>
                </Modal.Footer>
            </Modal>
            </Col>
    );
};

export default DeleteProfileModal;