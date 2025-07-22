// Cart.tsx
import React from 'react';
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity?: number;
}

interface CartProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  removeFromCart: (productId: string) => void;
  calculateTotal: () => number;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart, calculateTotal, setCart }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // ⛔ Usuario no logueado
  if (!token) {
    return (
      <Container className="mt-5 text-center">
        <h4>🚫 Debes iniciar sesión para ver tu carrito.</h4>
        <Button variant="primary" onClick={() => navigate('/login')} className="mt-3">
          Iniciar Sesión
        </Button>
      </Container>
    );
  }

  const handleConfirmarPedido = () => {
    navigate('/checkout');
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product._id === productId
          ? { ...product, quantity: quantity > 0 ? quantity : 1 }
          : product
      )
    );
  };

  return (
    <Container className="mt-4">
      <h2>🛒 Tu Carrito</h2>
      {cart.length === 0 ? (
        <p>No tienes productos en el carrito</p>
      ) : (
        <Row>
          {cart.map((product) => (
            <Col key={product._id} xs={12} md={6} lg={4}>
              <Card style={{ marginBottom: '1rem', padding: '10px' }}>
                <ProductCard product={product} />
                <Form.Group className="mt-2">
                  <Form.Label>Cantidad:</Form.Label>
                  <Form.Control
                    type="number"
                    value={product.quantity || 1}
                    min={1}
                    onChange={(e) =>
                      handleQuantityChange(product._id, parseInt(e.target.value))
                    }
                  />
                </Form.Group>
                <Button
                  variant="danger"
                  onClick={() => removeFromCart(product._id)}
                  style={{ marginTop: '10px', width: '100%' }}
                >
                  Eliminar
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <hr />
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <h4>Total: ${calculateTotal().toFixed(2)}</h4>
        <Button
          variant="success"
          style={{ marginTop: '10px', width: '100%' }}
          onClick={handleConfirmarPedido}
          disabled={cart.length === 0}
        >
          Finalizar Compra
        </Button>
      </div>
    </Container>
  );
};

export default Cart;
