import React, { useState } from 'react'
import { Alert, ListGroup, InputGroup, FormControl, Button, Card, Navbar, Nav, Container } from 'react-bootstrap';
import Ingredient from './Ingredient';
import { useNavigate } from 'react-router-dom';
import { logout } from '../firebase'

function AddIngredient() {
  const [value, setValue] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const newIngredients = [...ingredients, value];
    setValue('');
    setIngredients(newIngredients);
  }

  async function handleFinalSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      /*
      const requestIngr = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          ingredients
        ),
      };
      const ingr = await fetch(
        'http://localhost:9005/fitzone/ingredients/create-meal',
        requestIngr
      );
      const obj = await ingr.json();
      console.log(obj);*/
      const recipe = {
        'title': 'Paste Carbonara',
        'ingredients': ingredients,
        'description': `Se fierb pastele în apă cu sare conform instrucțiunilor de pe pachet. 
        Se limpezesc în jet de apă rece și se lasă la scurs.Baconul se taie cubulețe și se prăjește în 3 linguri de ulei, până se rumenește.
        Smântâna se amestecă cu gălbenușurile, sare și piper. Se toarnă amestecul peste bacon și se mai fierbe un minut.
        Se pun pastele peste sos și se amestecă.
        Se servesc fierbinți cu parmezan ras.`,
        'calories': '211.52 kcal',
        'carbs': '11.11 g',
        'proteins': '10.06 g',
        'fat': '14.07 g'
      }
      sessionStorage.setItem('recipe', JSON.stringify(recipe));
      navigate('/recipe');
    } catch {
      setError('Add Ingredient error');
    }
    setLoading(false);
  }

  function removeIngr(index) {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  }

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
          {error && <Alert variant='danger'>{error}</Alert>}
          <InputGroup className='mb-3'>
            <FormControl
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Add ingredient'
              aria-label='Add ingredient'
              aria-describedby='basic-addon'
            />
            <Button variant='outline-primary' onClick={handleSubmit}>
              Add
            </Button>
          </InputGroup>
          <ListGroup>
            {ingredients.map((ingredient, index) => (
              <Ingredient
                key={index}
                index={index}
                content={ingredient}
                remove={removeIngr}
              />
            ))}
          </ListGroup>
        </Card.Body>
        <Button variant='primary' onClick={handleFinalSubmit} disabled={loading}>
          Submit
        </Button>
      </Card>
    </div>
  );
}

export default AddIngredient