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

// Mock data for HR dashboard
const mockEmployees = [
  { id: 1, name: 'Dr. John Smith', department: 'Cardiology', status: 'Active' },
  { id: 2, name: 'Nurse Sarah Johnson', department: 'Emergency', status: 'Active' },
  { id: 3, name: 'Dr. Mike Wilson', department: 'Neurology', status: 'On Leave' },
];

const mockStats = {
  totalEmployees: 150,
  onLeave: 5,
  newApplications: 8,
};

const HRDashboard = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          HR & Payroll Overview
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Employees
              </Typography>
              <Typography variant="h4">
                {mockStats.totalEmployees}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Employees on Leave
              </Typography>
              <Typography variant="h4">
                {mockStats.onLeave}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                New Applications
              </Typography>
              <Typography variant="h4">
                {mockStats.newApplications}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Employee List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Employee Updates
            </Typography>
            <List>
              {mockEmployees.map((employee, index) => (
                <React.Fragment key={employee.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={employee.name}
                      secondary={`${employee.department} - ${employee.status}`}
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

export default HRDashboard;
