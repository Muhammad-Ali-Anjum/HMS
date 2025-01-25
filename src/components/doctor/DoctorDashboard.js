import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Event as EventIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Today's Appointments", count: 8, icon: <EventIcon />, color: '#1976d2' },
    { title: 'Total Patients', count: 145, icon: <PersonIcon />, color: '#2e7d32' },
    { title: 'Pending Reports', count: 3, icon: <AssignmentIcon />, color: '#ed6c02' },
    { title: 'New Messages', count: 5, icon: <NotificationsIcon />, color: '#9c27b0' },
  ];

  const upcomingAppointments = [
    {
      patientName: 'John Doe',
      time: '10:00 AM',
      type: 'Check-up',
      status: 'Confirmed',
    },
    {
      patientName: 'Jane Smith',
      time: '11:30 AM',
      type: 'Follow-up',
      status: 'Pending',
    },
    {
      patientName: 'Robert Johnson',
      time: '2:00 PM',
      type: 'Consultation',
      status: 'Confirmed',
    },
  ];

  const recentPatients = [
    {
      name: 'Alice Brown',
      age: 45,
      lastVisit: '2024-01-08',
      condition: 'Hypertension',
    },
    {
      name: 'Michael Wilson',
      age: 32,
      lastVisit: '2024-01-07',
      condition: 'Diabetes',
    },
    {
      name: 'Sarah Davis',
      age: 28,
      lastVisit: '2024-01-06',
      condition: 'Pregnancy',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Statistics Cards */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: `${stat.color}15`,
                  mb: 2,
                }}
              >
                {React.cloneElement(stat.icon, { sx: { fontSize: 30, color: stat.color } })}
              </Box>
              <Typography component="h2" variant="h4" color="primary" gutterBottom>
                {stat.count}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        ))}

        {/* Upcoming Appointments */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Today's Appointments
            </Typography>
            <List>
              {upcomingAppointments.map((appointment, index) => (
                <ListItem
                  key={index}
                  sx={{
                    borderBottom: index < upcomingAppointments.length - 1 ? 1 : 0,
                    borderColor: 'divider',
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1">{appointment.patientName}</Typography>
                        <Chip
                          label={appointment.status}
                          color={appointment.status === 'Confirmed' ? 'success' : 'warning'}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {appointment.time} - {appointment.type}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => navigate('/doctor/appointments')}
            >
              View All Appointments
            </Button>
          </Paper>
        </Grid>

        {/* Recent Patients */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Recent Patients
            </Typography>
            <List>
              {recentPatients.map((patient, index) => (
                <ListItem
                  key={index}
                  sx={{
                    borderBottom: index < recentPatients.length - 1 ? 1 : 0,
                    borderColor: 'divider',
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1">
                          {patient.name} ({patient.age})
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Last Visit: {patient.lastVisit}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography component="span" variant="body2" color="text.primary">
                        Condition: {patient.condition}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => navigate('/doctor/patients')}
            >
              View All Patients
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DoctorDashboard;
