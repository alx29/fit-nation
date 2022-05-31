import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  function updateSessionStorage() {
    sessionStorage.setItem('email', emailRef.current.value);
    sessionStorage.setItem('firstName', firstNameRef.current.value);
    sessionStorage.setItem(
      'lastName',
      lastNameRef.current.value
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Passwords do not match!');
    }
    setLoading(true);
    setError('');
    updateSessionStorage();
    try {
      const requestSignUp = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          username: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      };
      const obj = await fetch(
        'http://localhost:9001/login/signup',
        requestSignUp
      );
      console.log(obj);
      
      const requestLogIn = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          username: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      };
      const res = await fetch('http://localhost:9001/login/signin', requestLogIn);
      console.log(res);
      const res1 = await res.json();
      sessionStorage.setItem('jwt', res1['jwt']);
      console.log(sessionStorage.getItem('jwt'));
      navigate('/dashboard');
    } catch {
      setError('Sign Up Error');
    }
    setLoading(false);
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='firstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control type='text' ref={firstNameRef} required />
            </Form.Group>
            <Form.Group id='lastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type='text' ref={lastNameRef} required />
            </Form.Group>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type='password' ref={confirmPasswordRef} required />
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-4' type='submit'>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </div>
  );
}

export default Signup