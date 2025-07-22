import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactPage from './pages/ContactPage';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Cart from './pages/Cart';
import CheckoutPage from './pages/CheckoutPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import AdminPanel from './pages/AdminPanel';
import PaymentPage from './pages/PaymentPage';
import AdminOrders from './pages/AdminOrders';
import NavigationBar from './components/Navbar';
import PublicFooter from './components/PublicFooter';
import API from './api/api';
import './App.css';
import Register from './pages/Register';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity?: number;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/productos');
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener productos', error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p._id === product._id);
      if (existingProduct) {
        return prevCart.map((p) =>
          p._id === product._id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((product) => product._id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price * (product.quantity || 1), 0);
  };

  return (
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/productos" element={<Productos products={products} addToCart={addToCart} />} />
          <Route path="/carrito" element={<Cart cart={cart} setCart={setCart} removeFromCart={removeFromCart} calculateTotal={calculateTotal} />} />
          <Route path="/checkout" element={<PrivateRoute><CheckoutPage cart={cart} setCart={setCart} calculateTotal={calculateTotal}/></PrivateRoute>} />
          <Route path="/pago" element={<PrivateRoute><PaymentPage total={calculateTotal()} orderId={123}/></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute adminOnly><AdminPanel /></PrivateRoute>} />
          <Route path="/admin/orders" element={<PrivateRoute adminOnly><AdminOrders /></PrivateRoute>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <PublicFooter />
      </Router>
  );
};

export default App;
