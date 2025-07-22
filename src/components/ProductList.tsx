import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

interface Product {
  _id: string; // corregido: _id como string
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface Props {
  products: Product[];
}

export function ProductList({ products }: Props) {
  return (
    <Container style={{ marginTop: '2rem' }}>
      <Row>
        {products.map(product => (
          <Col key={product._id} xs={12} md={6} lg={4}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
