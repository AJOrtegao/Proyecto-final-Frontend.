import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function NavigationBar() {
  const user = useSelector((state: RootState) => state.user);

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
            {/* <NavLink to="/pago" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Pagar</NavLink> */}
            {user.isLoggedIn && user.role === 'admin' && (
              <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Admin Panel</NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

