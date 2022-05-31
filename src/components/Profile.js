import React, {useState} from 'react'
import { Card, Button, Navbar, Container, Nav } from 'react-bootstrap';
import ProfileElement from './ProfileElement';
import { useNavigate } from 'react-router-dom';
import { logout } from '../firebase'

function Profile() {
  const email = sessionStorage.getItem('email');
  const age = sessionStorage.getItem('age');
  const weight = sessionStorage.getItem('weight');
  const height = sessionStorage.getItem('height');
  const gender = sessionStorage.getItem('gender');
  const firstName = sessionStorage.getItem('firstName');
  const lastName = sessionStorage.getItem('lastName');
  const bmr = sessionStorage.getItem('bmr');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function editProfile() {
    navigate('/dashboard');
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
          <h2 className='text-center mb-4' style={{ color: '#0d6efd' }}>
            Profile
          </h2>
          <ProfileElement firstName={firstName} />
          <ProfileElement lastName={lastName} />
          <ProfileElement email={email} />
          <ProfileElement bmr={bmr} />
          <ProfileElement age={age} />
          <ProfileElement weight={weight} />
          <ProfileElement height={height} />
          <ProfileElement gender={gender} />
          <Button
            onClick={editProfile}
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