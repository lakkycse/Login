import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';


export default function Registration(props) {
    const useRegistrationFormState = () => {
        const init = {
            name: '',
            email: '',
            password: ''
        }
        const [values, setValues] = useState(init)
        // ... you can subscribe here
        return [values, setValues]
    }
    const [values, setValues] = useRegistrationFormState();
    const [message, setMessage] = useState(['']);
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }
    
    const handleRegister = (event) => {
        // alert('form submited: ' + JSON.stringify(values));
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        let user = users.filter(user => user.email === values.email);
        if (user.length === 0) {
            values.id = new Date().getTime()
            users.push(values)
            localStorage.setItem('users', JSON.stringify(users))
            setMessage(['success', 'User created Successfully'])
        } else {
            setMessage(['danger', 'User already existed with given mail id'])
        }
        event.preventDefault();

    }

    return (
        <Container>
            {message[0] !== '' ?
                <Alert variant={message[0]}>
                    {message[1]}
                </Alert> : ''
            }
            <h1>Registration Form</h1>
            <Form method={'POST'} onSubmit={handleRegister}>
                <Form.Group className="mb-6" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="name" name="name" value={values.name} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-6" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" name="email" value={values.email} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-6" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={values.password} onChange={handleChange} />
                </Form.Group>
                <Button style={{ marginTop: 20 }} type="submit" value="Submit">Register</Button>
                <Button style={{ marginTop: 20,marginLeft:20 }} type="button" href="/">Login</Button>
            </Form>
        </Container>
    );
}