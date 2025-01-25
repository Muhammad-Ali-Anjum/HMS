import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

// Mock data for pharmacist dashboard
const mockPrescriptions = [
  { id: 1, patient: 'John Doe', medicine: 'Medicine A', status: 'Pending' },
  { id: 2, patient: 'Jane Smith', medicine: 'Medicine B', status: 'Processing' },
  { id: 3, patient: 'Mike Brown', medicine: 'Medicine C', status: 'Ready' },
];

const mockStats = {
  pendingPrescriptions: 8,
  lowStockItems: 5,
  completedToday: 12,
};

const PharmacistDashboard = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Pharmacy Overview
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Prescriptions
              </Typography>
              <Typography variant="h4">
                {mockStats.pendingPrescriptions}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Low Stock Items
              </Typography>
              <Typography variant="h4">
                {mockStats.lowStockItems}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Completed Today
              </Typography>
              <Typography variant="h4">
                {mockStats.completedToday}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Prescriptions List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Prescriptions
            </Typography>
            <List>
              {mockPrescriptions.map((prescription, index) => (
                <React.Fragment key={prescription.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={`${prescription.patient} - ${prescription.medicine}`}
                      secondary={`Status: ${prescription.status}`}
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PharmacistDashboard;
