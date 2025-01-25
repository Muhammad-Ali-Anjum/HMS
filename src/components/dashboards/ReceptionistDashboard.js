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

// Mock data for receptionist dashboard
const mockAppointments = [
  { id: 1, patient: 'John Doe', time: '09:00 AM', doctor: 'Dr. Smith' },
  { id: 2, patient: 'Jane Smith', time: '10:30 AM', doctor: 'Dr. Johnson' },
  { id: 3, patient: 'Mike Brown', time: '02:00 PM', doctor: 'Dr. Wilson' },
];

const mockStats = {
  todayAppointments: 15,
  newRegistrations: 3,
  pendingInquiries: 5,
};

const ReceptionistDashboard = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Front Desk Overview
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Today's Appointments
              </Typography>
              <Typography variant="h4">
                {mockStats.todayAppointments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                New Registrations
              </Typography>
              <Typography variant="h4">
                {mockStats.newRegistrations}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Inquiries
              </Typography>
              <Typography variant="h4">
                {mockStats.pendingInquiries}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Appointments List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Appointments
            </Typography>
            <List>
              {mockAppointments.map((appointment, index) => (
                <React.Fragment key={appointment.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={`${appointment.patient} - ${appointment.doctor}`}
                      secondary={appointment.time}
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

export default ReceptionistDashboard;
