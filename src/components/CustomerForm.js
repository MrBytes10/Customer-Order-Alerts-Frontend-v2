import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

function CustomerForm({ api }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('customers/', {
        name,
        code,
        phone_number: phoneNumber,
      });
      console.log('Customer added successfully:', response.data);
      alert('Customer added successfully');
    } catch (error) {
      console.error('There was an error!', error.response ? error.response.data : error.message);
      alert('Failed to add customer. Please check the console for more details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">Add a New Customer</Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary">Add Customer</Button>
    </form>
  );
}

export default CustomerForm;