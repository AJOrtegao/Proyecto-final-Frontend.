import React, { useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const initialProducts: Product[] = [
  {
    _id: '1',
    name: 'Paracetamol 500mg',
    description: 'Alivia el dolor y reduce la fiebre.',
    price: 2.5,
    imageUrl: 'https://via.placeholder.com/100x80.png?text=Paracetamol',
  },
  {
    _id: '2',
    name: 'Jarabe para la tos',
    description: 'Jarabe expectorante con miel y eucalipto.',
    price: 5.0,
    imageUrl: 'https://via.placeholder.com/100x80.png?text=Jarabe',
  },
];

const AdminPanel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formState, setFormState] = useState<Omit<Product, '_id'>>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
  });

  const openModalToAdd = () => {
    setEditingProduct(null);
    setFormState({ name: '', description: '', price: 0, imageUrl: '' });
    setShowModal(true);
  };

  const openModalToEdit = (product: Product) => {
    setEditingProduct(product);
    setFormState({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      // Editar producto
      const updated = products.map((p) =>
        p._id === editingProduct._id ? { ...editingProduct, ...formState } : p
      );
      setProducts(updated);
    } else {
      // Agregar nuevo producto
      const newItem: Product = {
        _id: String(Date.now()),
        ...formState,
      };
      setProducts([...products, newItem]);
    }
    setShowModal(false);
    setEditingProduct(null);
    setFormState({ name: '', description: '', price: 0, imageUrl: '' });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🛠️ Panel de Administración</h2>
      <Button variant="success" onClick={openModalToAdd}>
        ➕ Agregar Producto
      </Button>

      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img src={product.imageUrl} alt={product.name} width="80" height="60" />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => openModalToEdit(product)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={formState.description}
                onChange={(e) => setFormState({ ...formState, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={formState.price}
                onChange={(e) => setFormState({ ...formState, price: parseFloat(e.target.value) })}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>URL de Imagen</Form.Label>
              <Form.Control
                type="text"
                value={formState.imageUrl}
                onChange={(e) => setFormState({ ...formState, imageUrl: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editingProduct ? 'Guardar Cambios' : 'Guardar Producto'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPanel;
