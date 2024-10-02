import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, MenuItem } from '@mui/material';

function OrderForm({ api }) {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get('customers/');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers', error);
      }
    };
    fetchCustomers();
  }, [api]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('orders/', {
        customer: customerId,
        item,
        amount,
      });
      alert('Order added successfully');
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">Add a New Order</Typography>
      <TextField
        label="Item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        select
        label="Select Customer"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        fullWidth
        margin="normal"
        required
      >
        {customers.map((customer) => (
          <MenuItem key={customer.id} value={customer.id}>
            {customer.name}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" color="primary">Add Order</Button>
    </form>
  );
}

export default OrderForm;