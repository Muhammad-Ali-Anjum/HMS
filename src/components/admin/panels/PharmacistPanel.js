import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  IconButton,
  Chip,
} from '@mui/material';
import {
  LocalPharmacy as PharmacyIcon,
  Medication as MedicationIcon,
  ShoppingCart as CartIcon,
  Assignment as AssignmentIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
  LocalShipping as ShippingIcon,
} from '@mui/icons-material';

const PharmacistPanel = () => {
  // Mock data - replace with actual API calls
  const medications = [
    {
      id: 1,
      name: 'Amoxicillin',
      category: 'Antibiotics',
      stock: 500,
      unit: 'tablets',
      status: 'In Stock',
    },
    {
      id: 2,
      name: 'Paracetamol',
      category: 'Pain Relief',
      stock: 50,
      unit: 'boxes',
      status: 'Low Stock',
    },
  ];

  const recentOrders = [
    {
      id: 1,
      patient: 'John Doe',
      medication: 'Amoxicillin',
      quantity: '20 tablets',
      status: 'Pending',
    },
    {
      id: 2,
      patient: 'Jane Smith',
      medication: 'Paracetamol',
      quantity: '2 boxes',
      status: 'Completed',
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in stock':
        return 'success';
      case 'low stock':
        return 'warning';
      case 'out of stock':
        return 'error';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Pharmacy Management Panel
      </Typography>

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Medications
              </Typography>
              <Typography variant="h3">524</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Low Stock Items
              </Typography>
              <Typography variant="h3">12</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Today's Orders
              </Typography>
              <Typography variant="h3">45</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Orders
              </Typography>
              <Typography variant="h3">8</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Medications List */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Medications Inventory</Typography>
                <Button
                  variant="contained"
                  startIcon={<MedicationIcon />}
                  color="primary"
                >
                  Add Medication
                </Button>
              </Box>
              <List>
                {medications.map((medication) => (
                  <React.Fragment key={medication.id}>
                    <ListItem
                      secondaryAction={
                        <Box>
                          <IconButton edge="end" aria-label="edit">
                            <EditIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <PharmacyIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {medication.name}
                            <Chip
                              label={medication.status}
                              size="small"
                              color={getStatusColor(medication.status)}
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                        secondary={
                          <>
                            {medication.category} • Stock: {medication.stock} {medication.unit}
                          </>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Orders
              </Typography>
              <List>
                {recentOrders.map((order) => (
                  <React.Fragment key={order.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <CartIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {order.patient}
                            <Chip
                              label={order.status}
                              size="small"
                              color={getStatusColor(order.status)}
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                        secondary={`${order.medication} - ${order.quantity}`}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<MedicationIcon />}
                    color="primary"
                  >
                    New Medication
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<CartIcon />}
                    color="secondary"
                  >
                    Process Order
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<WarningIcon />}
                    color="warning"
                  >
                    Low Stock Alert
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<ShippingIcon />}
                    color="info"
                  >
                    Order Supplies
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PharmacistPanel;
