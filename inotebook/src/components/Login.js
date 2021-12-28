import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const Login = (props) => {

  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate();


  const handleSubmit = async (e) => {

    e.preventDefault()
    const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()

    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.auth_token);
      props.showAlert('Successfully Logged In', 'success')
      navigate("/home");
    }
    else {
      props.showAlert(json.error, 'danger')
    }
  }


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name='email' value={credentials.email} onChange={onChange} required placeholder="Enter email" />

        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name='password' value={credentials.password} onChange={onChange} required placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Login
