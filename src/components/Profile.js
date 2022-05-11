import React from 'react'
import { Card, Button } from 'react-bootstrap';
import ProfileElement from './ProfileElement';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const email = sessionStorage.getItem('email');
  const age = sessionStorage.getItem('age');
  const weight = sessionStorage.getItem('weight');
  const height = sessionStorage.getItem('height');
  const gender = sessionStorage.getItem('gender');
  const firstName = sessionStorage.getItem('firstName');
  const lastName = sessionStorage.getItem('lastName');
  const navigate = useNavigate();

  function editProfile() {
    navigate('/dashboard');
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4' style={{ color: '#0d6efd' }}>
            Profile
          </h2>
          <ProfileElement firstName={firstName} />
          <ProfileElement lastName={lastName} />
          <ProfileElement email={email} />
          <ProfileElement age={age} />
          <ProfileElement weight={weight} />
          <ProfileElement height={height} />
          <ProfileElement gender={gender} />
          <Button onClick={editProfile}
            className='btn btn-primary w-100 mt-3'
            type='submit'
          >
            Update Profile
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile