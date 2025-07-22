import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function NavigationBar() {
  const user = useSelector((state: RootState) => state.user);
  const [role, setRole] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    setRole(storedRole);
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? 'navbar-brand active' : 'navbar-brand'}
        >
          {process.env.REACT_APP_APP_NAME || 'FarmaThony'}
          <br />
          <small>Tu farmacia online</small>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Inicio</NavLink>
            <NavLink to="/productos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Productos</NavLink>
            <NavLink to="/carrito" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Carrito</NavLink>
            {role === 'admin' && (
              <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Admin Panel</NavLink>
            )}
          </Nav>

          <Nav className="ms-auto">
            {isLoggedIn ? (
              <Nav.Link onClick={handleLogout}>Cerrar Sesión</Nav.Link>
            ) : (
              <>
                <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Iniciar Sesión</NavLink>
                <NavLink to="/register" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Registrarse</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
