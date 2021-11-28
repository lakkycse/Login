import React, { useState } from 'react';
// import { Button, Checkbox, Form } from 'semantic-ui-react'
// import { useHistory } from 'react-router';
import { Button, Form, Container } from 'react-bootstrap';
import { Router } from 'react-router';

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

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        // alert('form submited: ' + JSON.stringify(values));
        values.id = new Date().getTime()
        if (localStorage.getItem('users')) {
            let users = JSON.parse(localStorage.getItem('users'))
            console.log(users)
            let user = users.filter(user => user.email === values.email && user.password === values.password)
            if (user.length === 1) {
                Router.navigate('/users')
            }
            // users.push(values)
            localStorage.setItem('users', JSON.stringify(users))
        } else {
            let users = []
            users.push(values)
            localStorage.setItem('users', JSON.stringify(users))
        }
        event.preventDefault();
    }

    return (
        <Container>
            <h1>Login</h1>
            <Form>
                <Form.Group className="mb-6" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" name="email" value={values.email} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-6" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={values.password} onChange={handleChange} />
                </Form.Group>
                <div style={{ marginTop: 20 }}>
                    <Button style={{ marginRight: 20 }} type="submit" value="Submit" onClick={handleSubmit}>Submit</Button>
                    <Button type="button" href="/registration">Register</Button>
                </div>
            </Form>
        </Container>
    );
}