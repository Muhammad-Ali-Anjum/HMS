import React, { useState } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Chip,
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  ShoppingCart as OrdersIcon,
  Warning as AlertIcon,
  Add as AddIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

const PharmacyManagement = () => {
  // Mock data - replace with actual API calls
  const inventoryStats = {
    totalItems: 500,
    lowStock: 15,
    outOfStock: 5,
    recentUpdates: 25,
  };

  const recentOrders = [
    {
      id: 1,
      orderNumber: 'ORD001',
      date: '2025-01-10',
      status: 'Pending',
      items: 5,
      total: '$250',
    },
    {
      id: 2,
      orderNumber: 'ORD002',
      date: '2025-01-09',
      status: 'Completed',
      items: 3,
      total: '$180',
    },
    // Add more mock data as needed
  ];

  const lowStockItems = [
    {
      id: 1,
      name: 'Paracetamol',
      currentStock: 10,
      minRequired: 50,
    },
    {
      id: 2,
      name: 'Antibiotics',
      currentStock: 5,
      minRequired: 30,
    },
    // Add more mock data as needed
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Pharmacy Management
      </Typography>

      <Grid container spacing={3}>
        {/* Inventory Statistics */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Inventory Overview
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Total Items
                    </Typography>
                    <Typography variant="h4">
                      {inventoryStats.totalItems}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ bgcolor: 'warning.light' }}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Low Stock Items
                    </Typography>
                    <Typography variant="h4">
                      {inventoryStats.lowStock}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Recent Orders</Typography>
              <Button
                variant="outlined"
                startIcon={<OrdersIcon />}
                onClick={() => {/* Handle view all orders */}}
              >
                View All
              </Button>
            </Box>
            <List>
              {recentOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <ListItem>
                    <ListItemText
                      primary={`Order #${order.orderNumber}`}
                      secondary={`Date: ${order.date} | Items: ${order.items}`}
                    />
                    <ListItemSecondaryAction>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="subtitle2" component="span">
                        {order.total}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Low Stock Alerts */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">
                Low Stock Alerts
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {/* Handle restock */}}
                color="warning"
              >
                Restock Items
              </Button>
            </Box>
            <List>
              {lowStockItems.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem>
                    <ListItemText
                      primary={item.name}
                      secondary={`Current Stock: ${item.currentStock} | Minimum Required: ${item.minRequired}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => {/* Handle edit */}}
                      >
                        <EditIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PharmacyManagement;
