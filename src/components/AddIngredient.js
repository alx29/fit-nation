import React, { useState } from 'react'
import { ListGroup, InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import Ingredient from './Ingredient';

function AddIngredient() {
  const [value, setValue] = useState('');
  const [ingredients, setIngredients] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const newIngredients = [...ingredients, value];
    setValue('');
    setIngredients(newIngredients);
  }

  function removeIngr(index) {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  }

  return (
    <div>
      <Card>
        <Card.Body>
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
        <Button variant='primary'>Submit</Button>
      </Card>
    </div>
  );
}

export default AddIngredient