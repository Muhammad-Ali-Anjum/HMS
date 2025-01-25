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

// Mock data for patient dashboard
const mockAppointments = [
  { id: 1, doctor: 'Dr. Smith', date: '2025-01-25', time: '09:00 AM', type: 'Check-up' },
  { id: 2, doctor: 'Dr. Johnson', date: '2025-02-01', time: '10:30 AM', type: 'Follow-up' },
];

const mockPrescriptions = [
  { id: 1, medicine: 'Medicine A', dosage: '1 tablet daily', duration: '7 days' },
  { id: 2, medicine: 'Medicine B', dosage: '2 tablets twice daily', duration: '5 days' },
];

const PatientDashboard = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your Health Overview
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Appointments */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Appointments
            </Typography>
            <List>
              {mockAppointments.map((appointment, index) => (
                <React.Fragment key={appointment.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={`${appointment.doctor} - ${appointment.type}`}
                      secondary={`${appointment.date} at ${appointment.time}`}
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Prescriptions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Current Prescriptions
            </Typography>
            <List>
              {mockPrescriptions.map((prescription, index) => (
                <React.Fragment key={prescription.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={prescription.medicine}
                      secondary={`${prescription.dosage} for ${prescription.duration}`}
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Health Stats */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Next Appointment
                  </Typography>
                  <Typography variant="h6">
                    {mockAppointments[0].date}
                  </Typography>
                  <Typography variant="body2">
                    {mockAppointments[0].doctor}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Active Prescriptions
                  </Typography>
                  <Typography variant="h6">
                    {mockPrescriptions.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Last Visit
                  </Typography>
                  <Typography variant="h6">
                    2025-01-15
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PatientDashboard;
