import React from 'react';
import { Typography, Paper, Grid, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Assignment, PersonAdd, AddShoppingCart } from '@mui/icons-material';

function Home() {
  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Order Alert System
      </Typography>
      <Typography variant="body1" paragraph>
        This system helps you manage customers and orders efficiently. Get started by adding customers or creating new orders.
      </Typography>
      
      <Grid container spacing={3}>
                {/* Customer Management */}
                <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <PersonAdd fontSize="large" color="secondary" sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Customer Management
            </Typography>
            <Typography variant="body2" paragraph>
              Add and manage your customer information. Keep track of customer details for easy order association.
            </Typography>
            <Button
              component={Link}
              to="/add-customer"
              variant="contained"
              color="secondary"
              startIcon={<PersonAdd />}
              sx={{ mt: 'auto' }}
            >
              Add New Customer
            </Button>
          </Paper>
        </Grid>


        {/* Manage Orders */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Assignment fontSize="large" color="primary" sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Manage Orders
            </Typography>
            <Typography variant="body2" paragraph>
              Create and track orders for your customers. Keep all your order information organized in one place.
            </Typography>
            <Button
              component={Link}
              to="/add-order"
              variant="contained"
              color="primary"
              startIcon={<AddShoppingCart />}
              sx={{ mt: 'auto' }}
            >
              Add New Order
            </Button>
          </Paper>
        </Grid>
        


        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Assignment fontSize="large" color="info" sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              System Overview
            </Typography>
            <Typography variant="body2" paragraph>
              The Order Alert System streamlines your business operations by:
            </Typography>
            <ul>
              <li>Centralizing customer information</li>
              <li>Simplifying order management</li>
              <li>Providing quick access to important data</li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;