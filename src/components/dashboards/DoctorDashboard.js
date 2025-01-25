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

// Mock data for doctor dashboard
const mockAppointments = [
  { id: 1, patient: 'John Doe', time: '09:00 AM', type: 'Check-up' },
  { id: 2, patient: 'Jane Smith', time: '10:30 AM', type: 'Follow-up' },
  { id: 3, patient: 'Mike Johnson', time: '02:00 PM', type: 'Consultation' },
];

const mockStats = {
  todayPatients: 8,
  pendingAppointments: 5,
  completedAppointments: 12,
};

const DoctorDashboard = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, Dr. {user?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's your daily overview
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Today's Patients
              </Typography>
              <Typography variant="h4">
                {mockStats.todayPatients}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Appointments
              </Typography>
              <Typography variant="h4">
                {mockStats.pendingAppointments}
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
                {mockStats.completedAppointments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Appointments List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Today's Appointments
            </Typography>
            <List>
              {mockAppointments.map((appointment, index) => (
                <React.Fragment key={appointment.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={appointment.patient}
                      secondary={`${appointment.time} - ${appointment.type}`}
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

export default DoctorDashboard;
