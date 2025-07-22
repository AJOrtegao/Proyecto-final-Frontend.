import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity?: number;
}

interface CheckoutPageProps {
  cart: Product[];
  calculateTotal: () => number;
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, calculateTotal, setCart }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Tarjeta de Crédito');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !address || cart.length === 0) {
      alert('Por favor completa tus datos y agrega productos al carrito.');
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Crear orden
      const orderItems = cart.map((p) => ({
        productId: parseInt(p._id),
        quantity: p.quantity || 1,
      }));

      const orderRes = await API.post('/orders', { items: orderItems });
      const orderId = orderRes.data.id;

      // 2️⃣ Crear pago
      await API.post('/payments', {
        amount: calculateTotal(),
        paymentMethod,
        orderId,
      });

      setSuccess(true);
      setCart([]); // limpiar carrito

      setTimeout(() => {
        navigate('/'); // o a /orders
      }, 2000);
    } catch (error) {
      console.error('Error en checkout:', error);
      alert('Ocurrió un error al procesar tu pedido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>🧾 Checkout</h2>
      <p>Total a pagar: <strong>${calculateTotal().toFixed(2)}</strong></p>

      {success && <Alert variant="success">✅ ¡Compra realizada con éxito!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mt-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tu nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            placeholder="Dirección de envío"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Método de Pago</Form.Label>
          <Form.Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option>Tarjeta de Crédito</option>
            <option>PayPal</option>
            <option>Pago contra entrega</option>
          </Form.Select>
        </Form.Group>

        <Button
          className="mt-4 w-100"
          variant="success"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Finalizar Compra'}
        </Button>
      </Form>

      <hr className="my-4" />

      <h4>🛒 Resumen del Carrito</h4>
      <Row>
        {cart.map((product) => (
          <Col key={product._id} xs={12} sm={6} md={4}>
            <Card className="mb-3">
              <Card.Img variant="top" src={product.imageUrl} height={150} style={{ objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>
                  Cantidad: <strong>{product.quantity || 1}</strong><br />
                  Precio: <strong>${(product.price * (product.quantity || 1)).toFixed(2)}</strong>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CheckoutPage;