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
  Event as EventIcon,
  LocalHospital as MedicineIcon,
  Notifications as NotificationIcon,
} from '@mui/icons-material';
import axios from 'axios';

const PatientDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    upcomingAppointments: [],
    activePrescriptions: [],
    recentNotifications: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patient/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome Back!
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Appointments
            </Typography>
            <List>
              {dashboardData.upcomingAppointments.map((appointment) => (
                <ListItem key={appointment._id}>
                  <ListItemAvatar>
                    <Avatar>
                      <EventIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Dr. ${appointment.doctorName}`}
                    secondary={`${new Date(
                      appointment.date
                    ).toLocaleDateString()} ${new Date(
                      appointment.date
                    ).toLocaleTimeString()}`}
                  />
                  <Chip
                    label={appointment.status}
                    color={appointment.status === 'Confirmed' ? 'success' : 'warning'}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Active Prescriptions
            </Typography>
            <List>
              {dashboardData.activePrescriptions.map((prescription) => (
                <ListItem key={prescription._id}>
                  <ListItemAvatar>
                    <Avatar>
                      <MedicineIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={prescription.medication}
                    secondary={`Dosage: ${prescription.dosage} | Until: ${new Date(
                      prescription.endDate
                    ).toLocaleDateString()}`}
                  />
                  <Chip
                    label={prescription.status}
                    color={prescription.status === 'Active' ? 'success' : 'default'}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Notifications
            </Typography>
            <List>
              {dashboardData.recentNotifications.map((notification) => (
                <ListItem key={notification._id}>
                  <ListItemAvatar>
                    <Avatar>
                      <NotificationIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={notification.message}
                    secondary={new Date(notification.date).toLocaleString()}
                  />
                  <Chip
                    label={notification.type}
                    color={
                      notification.type === 'Urgent'
                        ? 'error'
                        : notification.type === 'Important'
                        ? 'warning'
                        : 'default'
                    }
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

export default PatientDashboard;
