import React, { useEffect, useState } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import API from '../api/api';

interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: 'Pendiente' | 'Enviado' | 'Cancelado';
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await API.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
    }
  };

  const updateOrderStatus = async (id: string, newStatus: Order['status']) => {
    try {
      await API.patch(`/orders/${id}`, { status: newStatus });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error al actualizar el estado del pedido:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2>📦 Gestión de Pedidos</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>${order.total.toFixed(2)}</td>
              <td>
                <Badge bg={
                  order.status === 'Pendiente'
                    ? 'warning'
                    : order.status === 'Enviado'
                    ? 'success'
                    : 'danger'
                }>
                  {order.status}
                </Badge>
              </td>
              <td>
                {order.status !== 'Enviado' && (
                  <Button
                    size="sm"
                    variant="success"
                    className="me-2"
                    onClick={() => updateOrderStatus(order.id, 'Enviado')}
                  >
                    Marcar como Enviado
                  </Button>
                )}
                {order.status !== 'Cancelado' && (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => updateOrderStatus(order.id, 'Cancelado')}
                  >
                    Cancelar
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminOrders;
