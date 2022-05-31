import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { login } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setError('');
    try {
      //await login(emailRef.current.value, passwordRef.current.value);
      const requestLogin = {
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
      const res = await fetch(
        'http://localhost:9001/login/signin',
        requestLogin
      );
      const res1 = await res.json();
      console.log(res1);
      sessionStorage.setItem('jwt', res1['jwt']);
      console.log(sessionStorage.getItem('jwt'));
      navigate('/profile');
    } catch {
      setError('Incorrect email or password');
    }
    setLoading(false);
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In </h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-4' type='submit'>
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Don't have an account? <Link to='/'>Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
