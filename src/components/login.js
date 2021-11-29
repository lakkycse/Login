import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

export default function Login(props) {
    const useLoginFormState = () => {
        const init = {
            email: '',
            password: ''
        }
        const [values, setValues] = useState(init)
        // ... you can subscribe here
        return [values, setValues]
    }
    const [values, setValues] = useLoginFormState();
    const [message, setMessage] = useState(['']);

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }
    let history = useHistory();
    const handleSubmit = (event) => {
        // alert('form submited: ' + JSON.stringify(values));
        values.id = new Date().getTime()
        if (localStorage.getItem('users')) {
            let users = JSON.parse(localStorage.getItem('users'))
            console.log(users)
            let user = users.filter(user => user.email === values.email && user.password === values.password)
            if (user.length === 1) {
                localStorage.setItem('loggedUser', JSON.stringify(user));
                // return <Redirect to='/users'/>
                history.push('/users');
            }
            else {
                setMessage(['danger', 'Incorrect username or password.']);
            }
            // users.push(values)
        } else {
            setMessage(['danger', 'Incorrect username or password.']);
        }
        event.preventDefault();
    }

    return (
        <Container>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-6" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" name="email" value={values.email} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-6" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={values.password} onChange={handleChange} />
                </Form.Group>
                <div style={{ marginTop: 20 }}>
                    <Button style={{ marginRight: 20 }} type="submit" value="Submit">Submit</Button>
                    <Button type="button" href="/registration">Register</Button>
                </div>
            </Form>
            {message[0] !== '' ?
                <Alert variant={message[0]}>
                    {message[1]}
                </Alert> : ''
            }
        </Container>
    );
}