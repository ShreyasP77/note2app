import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();


  const handleSubmit = async (e) => {

    const { name, email, password, cpassword } = credentials
    e.preventDefault()
<<<<<<< HEAD
    const response = await fetch("https://note-2-app.herokuapp.com/api/auth/", {
=======
    const response = await fetch("http://127.0.0.1:5000/api/auth/", {
>>>>>>> 7ba0ff32c1631b0804b617dc16331376d4371a81
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()

    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.auth_token);
      navigate("/home");
      props.showAlert('Successfully created your account', 'success')

    }
    else {
      props.showAlert(json.errors, 'danger')
    }
  }


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name='name' value={credentials.name} onChange={onChange} minLength='2' required placeholder="Enter name" />

        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name='email' value={credentials.email} onChange={onChange} required placeholder="Enter email" />

        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name='password' value={credentials.password} onChange={onChange} required minLength='5' placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cpassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" name='cpassword' value={credentials.cpassword} onChange={onChange} required minLength='5' placeholder="Password" />
        </Form.Group>

        <Button variant="primary" disabled={credentials.password.length < 5} type="submit">
          Submit
        </Button>
      </Form>


    </div>
  )

}

export default Signup
