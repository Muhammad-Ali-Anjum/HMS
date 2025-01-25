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
  Person as PersonIcon,
  Event as EventIcon,
  Assignment as AssignmentIcon,
  Message as MessageIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Phone as PhoneIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';

const ReceptionistPanel = () => {
  // Mock data - replace with actual API calls
  const appointments = [
    {
      id: 1,
      patientName: 'John Doe',
      doctorName: 'Dr. Smith',
      time: '10:00 AM',
      type: 'New Visit',
      status: 'Confirmed',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      doctorName: 'Dr. Johnson',
      time: '11:30 AM',
      type: 'Follow-up',
      status: 'Pending',
    },
  ];

  const recentCalls = [
    {
      id: 1,
      name: 'Alice Brown',
      time: '9:45 AM',
      purpose: 'Appointment Inquiry',
      status: 'Completed',
    },
    {
      id: 2,
      name: 'Bob Wilson',
      time: '9:30 AM',
      purpose: 'Emergency',
      status: 'Transferred',
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      case 'completed':
        return 'info';
      case 'transferred':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Reception Management Panel
      </Typography>

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Today's Appointments
              </Typography>
              <Typography variant="h3">24</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Check-ins
              </Typography>
              <Typography variant="h3">8</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Available Doctors
              </Typography>
              <Typography variant="h3">12</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Calls Today
              </Typography>
              <Typography variant="h3">45</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Appointments List */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Today's Appointments</Typography>
                <Button
                  variant="contained"
                  startIcon={<CalendarIcon />}
                  color="primary"
                >
                  New Appointment
                </Button>
              </Box>
              <List>
                {appointments.map((appointment) => (
                  <React.Fragment key={appointment.id}>
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
                          <EventIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {appointment.patientName}
                            <Chip
                              label={appointment.status}
                              size="small"
                              color={getStatusColor(appointment.status)}
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                        secondary={
                          <>
                            {appointment.doctorName} • {appointment.time} • {appointment.type}
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

        {/* Recent Calls */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Calls
              </Typography>
              <List>
                {recentCalls.map((call) => (
                  <React.Fragment key={call.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <PhoneIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {call.name}
                            <Chip
                              label={call.status}
                              size="small"
                              color={getStatusColor(call.status)}
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                        secondary={`${call.time} - ${call.purpose}`}
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
                    New Patient
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
                    Check-in Patient
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

export default ReceptionistPanel;
