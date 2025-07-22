import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ContactPage: React.FC = () => {
  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h2>✉️ Contáctanos</h2>
          <p>
            Si tienes preguntas, sugerencias o necesitas ayuda con tu pedido,
            completa el siguiente formulario o escríbenos a <strong>soporte@farmathony.com</strong>.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group className="mb-3" controlId="contactName">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu nombre" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="contactEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="tucorreo@ejemplo.com" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="contactMessage">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Escribe tu mensaje..." required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar mensaje
            </Button>
          </Form>
        </Col>

        <Col md={6} className="mt-4 mt-md-0">
          <h5>🌐 Nuestras redes sociales</h5>
          <ul>
            <li>Facebook: @FarmathonyEC</li>
            <li>Instagram: @FarmathonyOficial</li>
            <li>WhatsApp: +593 99 999 9999</li>
          </ul>
          <h5>📍 Dirección</h5>
          <p>Puellaro - Quito, Ecuador</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
