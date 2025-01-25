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
} from '@mui/material';
import {
  Person as PersonIcon,
  Event as EventIcon,
  Assignment as AssignmentIcon,
  Message as MessageIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const DoctorPanel = () => {
  // Mock data - replace with actual API calls
  const doctors = [
    {
      id: 1,
      name: 'Dr. John Smith',
      specialization: 'Cardiologist',
      patients: 45,
      appointments: 8,
      status: 'Available',
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      specialization: 'Pediatrician',
      patients: 38,
      appointments: 6,
      status: 'In Surgery',
    },
    // Add more mock data
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: 'Alice Brown',
      time: '10:00 AM',
      type: 'Check-up',
    },
    {
      id: 2,
      patient: 'Bob Wilson',
      time: '11:30 AM',
      type: 'Follow-up',
    },
    // Add more mock data
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Doctor Management Panel
      </Typography>

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Doctors
              </Typography>
              <Typography variant="h3">24</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Doctors
              </Typography>
              <Typography variant="h3">18</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Today's Appointments
              </Typography>
              <Typography variant="h3">45</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Patients
              </Typography>
              <Typography variant="h3">850</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Doctor List */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Doctors List</Typography>
                <Button variant="contained" color="primary">
                  Add New Doctor
                </Button>
              </Box>
              <List>
                {doctors.map((doctor) => (
                  <React.Fragment key={doctor.id}>
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
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={doctor.name}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              {doctor.specialization}
                            </Typography>
                            {` — Patients: ${doctor.patients} • Appointments: ${doctor.appointments} • ${doctor.status}`}
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

        {/* Upcoming Appointments */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Today's Appointments
              </Typography>
              <List>
                {upcomingAppointments.map((appointment) => (
                  <React.Fragment key={appointment.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <EventIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={appointment.patient}
                        secondary={`${appointment.time} - ${appointment.type}`}
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
                    startIcon={<PersonIcon />}
                    color="primary"
                  >
                    Add Doctor
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<EventIcon />}
                    color="secondary"
                  >
                    Schedule Appointment
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<AssignmentIcon />}
                    color="info"
                  >
                    View Reports
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<MessageIcon />}
                    color="success"
                  >
                    Send Message
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

export default DoctorPanel;
