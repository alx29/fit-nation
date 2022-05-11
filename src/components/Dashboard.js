import React, { useState, useRef } from 'react';
import { Card, Button, Alert, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { logout } from '../firebase';

function Dashboard() {
  const currentUser = auth.currentUser;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const weightRef = useRef();
  const heightRef = useRef();
  const ageRef = useRef();

  async function handleLogout(e) {
    e.preventDefault();

    setError("");
    setLoading(true);
    try {
      await logout();
      navigate('/login');
    } catch {
      setError("Failed to log out");
    }
    setLoading(false);
  }

  function handleUpdateProfile(e) {
    e.preventDefault();

    setError("");
    setLoading(true);
    navigate('/profile');
    setLoading(false);
  }

  function useLocalStorage() {
    localStorage.setItem('email', JSON.stringify(currentUser.email));
    localStorage.setItem('weight', JSON.stringify(weightRef.current.value));
    localStorage.setItem('height', JSON.stringify(heightRef.current.value));
    localStorage.setItem('age', JSON.stringify(ageRef.current.value));
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <div className='mb-4'>
            <strong>Email:</strong> {currentUser.email}
          </div>
          <Form onSubmit={handleUpdateProfile}>
            <Form.Group id='weight'>
              <Form.Label>Weight(kg)</Form.Label>
              <Form.Control type='text' ref={weightRef} required />
            </Form.Group>
            <Form.Group id='height'>
              <Form.Label>Height(cm)</Form.Label>
              <Form.Control type='text' ref={heightRef} required />
            </Form.Group>
            <Form.Group id='age'>
              <Form.Label>Age</Form.Label>
              <Form.Control type='text' ref={ageRef} required />
            </Form.Group>
            <Button onClick={useLocalStorage} disabled={loading} className='btn btn-primary w-100 mt-3' type='submit'>
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button variant='link' onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );
}

export default Dashboard