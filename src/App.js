import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Button, Typography } from '@mui/material';
import axios from 'axios';
import CustomerForm from './components/CustomerForm';
import OrderForm from './components/OrderForm';
import Home from './components/Home';

function App() {
  const [token, setToken] = useState(null);

  const fetchToken = useCallback(async () => {
    try {
      console.log('Fetching token...');
      const response = await axios.post('http://127.0.0.1:8000/o/token/', {
        grant_type: 'client_credentials',
        client_id: '53ND1sdyhVq6ifrUzPIKbLy0JTVAKQsmWVAOhm25',
        client_secret: 'pSx6gNRStyKDSyzWNJrrzHKteuUykMTLBpNykmpSMvB39wDYe1UkWYpB8Hk8nXZiifx3B2fTuL2F1tPHzvAXTeTizaEELYu7gORFbrDwp9N4hxlniFCO55Tq9s4f35Qg',
      });
      console.log('Token response:', response.data);
      setToken(response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.error('Error fetching token:', error.response ? error.response.data : error.message);
      return null;
    }
  }, []);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  const createApi = useCallback(() => {
    const api = axios.create({
      baseURL: 'http://127.0.0.1:8000/api/',
    });

    api.interceptors.request.use(async (config) => {
      if (!token) {
        const newToken = await fetchToken();
        if (newToken) {
          config.headers['Authorization'] = `Bearer ${newToken}`;
        }
      } else {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      console.log('Starting Request', config);
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    api.interceptors.response.use((response) => {
      console.log('Response:', response);
      return response;
    }, (error) => {
      console.log('Response Error:', error.response);
      return Promise.reject(error);
    });

    return api;
  }, [token, fetchToken]);

  return (
    <Router>
      <Container maxWidth="md" style={{ marginTop: '50px' }}>
        <Typography variant="h4" gutterBottom>Order Alert System</Typography>
        <nav>
          <Button component={Link} to="/" variant="contained" color="primary" style={{ marginRight: '10px' }}>
            Home
          </Button>
          <Button component={Link} to="/add-customer" variant="contained" color="secondary" style={{ marginRight: '10px' }}>
            Add Customer
          </Button>
          <Button component={Link} to="/add-order" variant="contained" color="secondary">
            Add Order
          </Button>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-customer" element={<CustomerForm api={createApi()} />} />
          <Route path="/add-order" element={<OrderForm api={createApi()} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;