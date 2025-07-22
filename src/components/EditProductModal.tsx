import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface EditProductModalProps {
  show: boolean;
  onHide: () => void;
  product: Product | null;
  onSave: (updatedProduct: Product) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ show, onHide, product, onSave }) => {
  const [formData, setFormData] = useState<Product>({
    _id: '',
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="editName" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="editDescription" className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="editPrice" className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="editImage" className="mb-3">
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Guardar Cambios</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProductModal;
