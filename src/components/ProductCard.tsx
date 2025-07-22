import React from 'react';
import { Card, Button } from 'react-bootstrap';

interface Product {
  _id: string;  // Cambiamos para que coincida con el resto del proyecto
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>
          <strong>Precio: </strong>${product.price.toFixed(2)}
        </Card.Text>
        <Button variant="primary">Agregar al carrito</Button>
      </Card.Body>
    </Card>
  );
}
