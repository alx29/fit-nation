import { Container } from 'react-bootstrap';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddIngredient from './components/AddIngredient';

export default function App() {

  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: '100vh' }}
    >
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/add-ingredient' element={<AddIngredient />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Container>
  );
}