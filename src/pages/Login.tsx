import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/user.slice';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import API from '../api/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await API.post('/auth/login', { email, password });

      const user = response.data.user;
      const token = response.data.access_token;

      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('userId', user.id); // lo usaremos para futuras acciones como obtener órdenes

      dispatch(login(user));
      navigate('/');
    } catch (err: any) {
      console.error('Error en login:', err);
      setError(
        err.response?.data?.message || 'Error al iniciar sesión. Intenta nuevamente.'
      );
    }
  };

  return (
    <Container style={{ maxWidth: '400px', marginTop: '80px' }}>
      <h3>Iniciar Sesión</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100">
          Entrar
        </Button>
      </Form>
      <div className="mt-3 text-center">
        <span>¿No tienes cuenta? </span>
        <Link to="/register">Regístrate aquí</Link>
      </div>
    </Container>
  );
};

export default Login;
