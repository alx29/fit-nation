import React, { useState, useRef } from 'react';
import { Card, Button, Alert, Form, Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout } from '../firebase';

function Dashboard() {
  const currentEmail = sessionStorage.getItem('email');
  const firstName = sessionStorage.getItem('firstName');
  const lastName = sessionStorage.getItem('lastName');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const weightRef = useRef();
  const heightRef = useRef();
  const ageRef = useRef();
  const [male, setMale] = useState(false);
  const activityRef = useRef();

  function goHome(e) {
    e.preventDefault();
    navigate('/profile');
  }

  function goToProfile(e) {
    e.preventDefault();
    navigate('/profile');
  }

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

  async function handleUpdateProfile(e) {
    e.preventDefault();

    setError("");
    setLoading(true);
    const requestSetProfile = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('jwt')
      },
      body: JSON.stringify({
        name: firstName + ' ' + lastName,
        username: currentEmail,
        age: ageRef.current.value,
        kilos: weightRef.current.value,
        height: heightRef.current.value,
        gender: male ? 'man' : 'women',
        activityLevel: activityRef.current.value
      }),
    };
    const obj = await fetch(
      'http://localhost:9002/profile/set',
      requestSetProfile
    );
    console.log(obj);
    const obj2 = await obj.json();
    console.log(obj2);
    sessionStorage.setItem('bmr', obj2['bmr']);
    navigate('/profile');
    setLoading(false);
  }

  function changeInMale() {
    setMale(true);
  }

  function changeInFemale() {
    setMale(false);
  }

  function useSessionStorage() {
    sessionStorage.setItem('weight', JSON.stringify(weightRef.current.value));
    sessionStorage.setItem('height', JSON.stringify(heightRef.current.value));
    sessionStorage.setItem('age', JSON.stringify(ageRef.current.value));
    if (male === true)
      sessionStorage.setItem('gender', JSON.stringify('Male'));
    else
      sessionStorage.setItem('gender', JSON.stringify('Female'));
  }

  function goToIngredients(e) {
    e.preventDefault();
    navigate('/add-ingredient');
  }

  return (
    <div>
      <Navbar fixed='top' bg='primary' variant='dark'>
        <Container>
          <Navbar.Brand onClick={goHome}>FitNation</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link onClick={goHome}>Home</Nav.Link>
            <Nav.Link onClick={goToIngredients}>Add ingredients</Nav.Link>
            <Nav.Link onClick={goToProfile}>Profile</Nav.Link>
            <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Set Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <div className='mb-4'>
            <strong>Email:</strong> {currentEmail}
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
            <Form.Select ref={activityRef} className='mt-4' aria-label='Activity-level'>
              <option>Activity-level</option>
              <option value='1'>One</option>
              <option value='2'>Two</option>
              <option value='3'>Three</option>
              <option value='4'>Four</option>
              <option value='5'>Five</option>
            </Form.Select>
            <div key={'inline-radio'} className='mt-4'>
              Gender:&nbsp;&nbsp;&nbsp;
              <Form.Check
                inline
                label='Male'
                name='group1'
                type={'radio'}
                id={'inline-radio-1'}
                onChange={changeInMale}
              />
              <Form.Check
                inline
                label='Female'
                name='group1'
                type={'radio'}
                id={'inline-radio-2'}
                onChange={changeInFemale}
              />
            </div>
            <Button
              onClick={useSessionStorage}
              disabled={loading}
              className='btn btn-primary w-100 mt-3'
              type='submit'
            >
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