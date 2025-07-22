import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // ✅ Agregado para navegación interna

const PublicFooter: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <Container>
        <Row>
          <Col md={6}>
            <h5 style={styles.title}>FarmaThony</h5>
            <p style={styles.text}>Tu farmacia online de confianza. Calidad, rapidez y atención garantizada.</p>
          </Col>
          <Col md={3}>
            <h6 style={styles.subtitle}>Enlaces</h6>
            <ul style={styles.list}>
              <li><Link to="/" style={styles.link}>Inicio</Link></li>
              <li><Link to="/productos" style={styles.link}>Productos</Link></li>
              <li><Link to="/carrito" style={styles.link}>Carrito</Link></li>
              <li><Link to="/contacto" style={styles.link}>Contacto / Ayuda</Link></li> {/* ✅ Nuevo enlace */}
            </ul>
          </Col>
          <Col md={3}>
            <h6 style={styles.subtitle}>Contacto</h6>
            <p style={styles.text}>📞 +593 999 888 777</p>
            <p style={styles.text}>📧 contacto@farmathony.ec</p>
          </Col>
        </Row>
        <hr style={{ borderColor: '#ccc' }} />
        <p className="text-center" style={{ color: '#ddd' }}>© {new Date().getFullYear()} FarmaThony. Todos los derechos reservados.</p>
      </Container>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#3c1361', // morado oscuro suave
    color: '#f1faee',
    paddingTop: '30px',
    paddingBottom: '20px',
    marginTop: '60px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#f1faee',
  },
  subtitle: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#f1faee',
  },
  text: {
    fontSize: '14px',
    color: '#f1faee',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    color: '#a8dadc',
  },
};

export default PublicFooter;
