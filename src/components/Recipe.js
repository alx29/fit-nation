import React, { useState } from 'react'
import { Card, Navbar, Container, Nav, ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { logout } from '../firebase';

function Recipe() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const recipe = sessionStorage.getItem('recipe');
  const recipe1 = JSON.parse(recipe);
  const ingredients = recipe1['ingredients'];
  console.log(ingredients);
  let str = '';

  function goHome(e) {
    e.preventDefault();
    navigate('/profile');
  }

  function goToProfile(e) {
    e.preventDefault();
    navigate('/profile');
  }

  function goToIngredients(e) {
    e.preventDefault();
    navigate('/add-ingredient');
  }

  async function handleLogout(e) {
    e.preventDefault();

    setError('');
    setLoading(true);
    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
    setLoading(false);
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
          <h2 className='text-center mb-4' style={{ color: '#0d6efd' }}>
            {recipe1['title']}
          </h2>
          <div className='mb-4'>
            <strong>Ingredients:</strong>
            {ingredients.map((ingredient, i) => {
              if (i === ingredients.length - 1) {
                str += ingredient;
                return str;
              }
              if (i === 0) {
                str += ' ';
              }
              str += ingredient + ', ';
            })}
          </div>
          <div className='mb-4'>
            <strong>Calories:</strong> {recipe1['calories']}
          </div>
          <div className='mb-4'>
            <strong>Carbs:</strong> {recipe1['carbs']}
          </div>
          <div className='mb-4'>
            <strong>Fat:</strong> {recipe1['fat']}
          </div>
          <div className='mb-4'>
            <strong>Protein:</strong> {recipe1['proteins']}
          </div>
          <div className='mb-4'>
            <strong>Description:</strong> {recipe1['description']}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Recipe