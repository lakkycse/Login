import React, { useState } from 'react';
// import { useHistory } from 'react-router';

import { Button, Container, Card, Col, Modal, Form } from 'react-bootstrap';

export default function Users() {

    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')));
    const [show, setShow] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const handleClose = () => setShow(false);
    const useRegistrationFormState = () => {
        const init = {
            name: '',
            email: '',
        }
        const [values, setValues] = useState(init)
        // ... you can subscribe here
        return [values, setValues]
    }
    const [values, setValues] = useRegistrationFormState();

    const handleShow = (index) => {
        setShow(true);
        setCurrentUser(index);
        setValues(users[index])
    };


    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }
    const editUser = (event) => {
        users[currentUser].name = values.name
        users[currentUser].email = values.email
        // setUsers(users)
        localStorage.setItem('users', JSON.stringify(users))
        setValues({
            name: '',
            email: '',
        })
        handleClose()
    }
    const deleteUser = (index) => {
        let users1 = users
        users1.splice(index, 1)
        setUsers(users1)
        window.location.reload(false);

        localStorage.setItem('users', JSON.stringify(users1))
        handleClose()
    }
    return (
        <Container>
            {show ? <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="name" value={values.name} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="email" value={values.email} onChange={handleChange} />
                        </Form.Group>
                    </Form>

                    {/* <InputGroup.Text id="basic-addon1" value={users[currentUser].name}></InputGroup.Text>
                    <InputGroup.Text id="basic-addon1" value={users[currentUser].email}></InputGroup.Text> */}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={editUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal> : null}
            {
                users.map((user, index) => {
                    console.log(user);
                    return (
                        <Col xs={12} md={4} key={index}>
                            <Card style={{ width: '18rem' }}>
                                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                <Card.Body style={{ color: 'black' }}>
                                    <Card.Title>{user.name}</Card.Title>
                                    <Card.Text>{user.email}</Card.Text>
                                    <Button variant="primary" onClick={() => handleShow(index)}>Edit</Button>
                                    <Button variant="primary" onClick={() => deleteUser(index)}>Delete</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }
                )
            }
        </Container>
    )
}