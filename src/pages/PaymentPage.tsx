import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import API from '../api/api';

interface PaymentPageProps {
  total: number;
  orderId: number; // necesario para relacionar el pago
}

const PaymentPage: React.FC<PaymentPageProps> = ({ total, orderId }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const paymentData = {
        orderId,
        amount: total,
        paymentMethod: 'Tarjeta Visa', // puedes hacerlo dinámico si deseas
      };

      await API.post('/payments', paymentData);

      setSuccess(true);
      setTimeout(() => {
        alert(`💳 Pago de $${total.toFixed(2)} realizado con éxito.`);
      }, 300);
    } catch (err) {
      console.error(err);
      setError('❌ Error al procesar el pago. Inténtalo nuevamente.');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h2>💰 Finalizar Pago</h2>
      <p>Total a pagar: <strong>${total.toFixed(2)}</strong></p>

      {success && <Alert variant="success">✅ ¡Pago procesado con éxito!</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCardNumber" className="mt-3">
          <Form.Label>Número de Tarjeta</Form.Label>
          <Form.Control
            type="text"
            placeholder="XXXX XXXX XXXX XXXX"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4 w-100">
          Realizar Pago
        </Button>
      </Form>
    </Container>
  );
};

export default PaymentPage;
