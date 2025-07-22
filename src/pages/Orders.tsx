import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Container, Row, Col } from 'react-bootstrap';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await API.get('/orders');
      setOrders(response.data);
    };
    
    fetchOrders();
  }, []);

  return (
    <Container>
      <h2>Mis Pedidos</h2>
      <Row>
        {orders.map((order) => (
          <Col key={order.id}>
            <div>Pedido #{order.id}</div>
            <div>Total: ${order.total}</div>
            <div>Estado: {order.status}</div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Orders;
