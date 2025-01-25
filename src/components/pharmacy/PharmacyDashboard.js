import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  ShoppingCart as OrderIcon,
  Warning as AlertIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import axios from 'axios';

const PharmacyDashboard = () => {
  const [stats, setStats] = useState({
    totalMedicines: 0,
    lowStock: 0,
    pendingOrders: 0,
    todaySales: 0,
  });

  const [recentSales, setRecentSales] = useState([]);
  const [stockAlerts, setStockAlerts] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, salesRes, alertsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/pharmacy/stats'),
        axios.get('http://localhost:5000/api/pharmacy/recent-sales'),
        axios.get('http://localhost:5000/api/pharmacy/stock-alerts'),
      ]);

      setStats(statsRes.data);
      setRecentSales(salesRes.data);
      setStockAlerts(alertsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const StatCard = ({ title, value, icon, color = 'primary' }) => (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            p: 1,
            bgcolor: `${color}.light`,
            borderRadius: 1,
            mr: 2,
            display: 'flex',
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h6">{value}</Typography>
          <Typography variant="body2" color="textSecondary">
            {title}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Pharmacy Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Medicines"
            value={stats.totalMedicines}
            icon={<InventoryIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Low Stock Items"
            value={stats.lowStock}
            icon={<AlertIcon />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Orders"
            value={stats.pendingOrders}
            icon={<OrderIcon />}
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Today's Sales"
            value={`$${stats.todaySales}`}
            icon={<TrendingIcon />}
            color="success"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Sales
            </Typography>
            <List>
              {recentSales.map((sale) => (
                <ListItem key={sale._id}>
                  <ListItemAvatar>
                    <Avatar>
                      <InventoryIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={sale.medicineName}
                    secondary={`Quantity: ${sale.quantity} | Amount: $${sale.amount}`}
                  />
                  <Typography variant="caption">
                    {new Date(sale.date).toLocaleString()}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Stock Alerts
            </Typography>
            <List>
              {stockAlerts.map((alert) => (
                <ListItem key={alert._id}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'warning.light' }}>
                      <AlertIcon color="warning" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={alert.medicineName}
                    secondary={`Current Stock: ${alert.currentStock} | Minimum Required: ${alert.minRequired}`}
                  />
                  <Chip
                    label={
                      alert.currentStock === 0 ? 'Out of Stock' : 'Low Stock'
                    }
                    color={alert.currentStock === 0 ? 'error' : 'warning'}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PharmacyDashboard;
