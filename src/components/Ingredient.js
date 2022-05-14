import React from 'react'
import { ListGroup, CloseButton } from 'react-bootstrap';

function Ingredient({index, content, remove}) {
  return (
    <div>
      <ListGroup.Item>
        {content} <CloseButton onClick={() => remove(index)} style={{ float: 'right' }} />
      </ListGroup.Item>
    </div>
  );
}

export default Ingredient