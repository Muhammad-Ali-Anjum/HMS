import React, { useState } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Button,
  Divider,
  Tab,
  Tabs,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Schedule as RescheduleIcon,
  Today as TodayIcon,
  Event as EventIcon,
} from '@mui/icons-material';

const DoctorAppointments = () => {
  const [tabValue, setTabValue] = useState(0);

  // Mock data - replace with actual API calls
  const todayAppointments = [
    {
      id: 1,
      patientName: 'John Doe',
      time: '10:00 AM',
      type: 'Check-up',
      status: 'Upcoming',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      time: '11:30 AM',
      type: 'Follow-up',
      status: 'Completed',
    },
    // Add more mock data as needed
  ];

  const upcomingAppointments = [
    {
      id: 3,
      patientName: 'Alice Johnson',
      date: '2025-01-11',
      time: '09:00 AM',
      type: 'New Patient',
      status: 'Confirmed',
    },
    {
      id: 4,
      patientName: 'Bob Wilson',
      date: '2025-01-12',
      time: '02:30 PM',
      type: 'Follow-up',
      status: 'Pending',
    },
    // Add more mock data as needed
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'upcoming':
      case 'confirmed':
        return 'primary';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Appointments
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
      >
        <Tab icon={<TodayIcon />} label="Today" />
        <Tab icon={<EventIcon />} label="Upcoming" />
      </Tabs>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          {/* Today's Statistics */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Today's Appointments
                </Typography>
                <Typography variant="h4">
                  {todayAppointments.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Today's Appointments List */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <List>
                {todayAppointments.map((appointment) => (
                  <React.Fragment key={appointment.id}>
                    <ListItem>
                      <ListItemText
                        primary={appointment.patientName}
                        secondary={`${appointment.time} - ${appointment.type}`}
                      />
                      <ListItemSecondaryAction>
                        <Chip
                          label={appointment.status}
                          color={getStatusColor(appointment.status)}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <IconButton
                          edge="end"
                          aria-label="complete"
                          onClick={() => {/* Handle complete */}}
                        >
                          <CheckIcon />
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
      )}

      {tabValue === 1 && (
        <Paper sx={{ p: 2 }}>
          <List>
            {upcomingAppointments.map((appointment) => (
              <React.Fragment key={appointment.id}>
                <ListItem>
                  <ListItemText
                    primary={appointment.patientName}
                    secondary={`${appointment.date} ${appointment.time} - ${appointment.type}`}
                  />
                  <ListItemSecondaryAction>
                    <Chip
                      label={appointment.status}
                      color={getStatusColor(appointment.status)}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <IconButton
                      onClick={() => {/* Handle reschedule */}}
                      sx={{ mr: 1 }}
                    >
                      <RescheduleIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {/* Handle cancel */}}
                      color="error"
                    >
                      <CancelIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default DoctorAppointments;
