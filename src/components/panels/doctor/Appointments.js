import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  VideoCall as VideoCallIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import SearchBar from '../../common/SearchBar';

const Appointments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments] = useState([
    {
      id: 1,
      patient: 'John Doe',
      time: '09:00 AM',
      date: '2025-01-24',
      type: 'Check-up',
      status: 'Upcoming',
      isOnline: false,
    },
    {
      id: 2,
      patient: 'Jane Smith',
      time: '10:30 AM',
      date: '2025-01-24',
      type: 'Follow-up',
      status: 'Upcoming',
      isOnline: true,
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      time: '02:00 PM',
      date: '2025-01-24',
      type: 'Consultation',
      status: 'Completed',
      isOnline: false,
    },
  ]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredAppointments = appointments.filter(appointment => {
    const searchStr = searchQuery.toLowerCase();
    return (
      appointment.patient.toLowerCase().includes(searchStr) ||
      appointment.type.toLowerCase().includes(searchStr) ||
      appointment.status.toLowerCase().includes(searchStr)
    );
  });

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs>
          <Typography variant="h4">
            Appointments
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <SearchBar
            placeholder="Search appointments..."
            value={searchQuery}
            onChange={handleSearch}
            onClear={() => setSearchQuery('')}
          />
        </Grid>
      </Grid>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Today's Appointments
              </Typography>
              <Typography variant="h4">8</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Upcoming
              </Typography>
              <Typography variant="h4">5</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Online Consultations
              </Typography>
              <Typography variant="h4">3</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completed Today
              </Typography>
              <Typography variant="h4">2</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Appointments List */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Today's Schedule</Typography>
          <Button variant="contained" color="primary">
            New Appointment
          </Button>
        </Box>

        <List>
          {filteredAppointments.map((appointment) => (
            <React.Fragment key={appointment.id}>
              <ListItem
                secondaryAction={
                  <Box>
                    {appointment.status === 'Upcoming' && (
                      <>
                        <IconButton edge="end" aria-label="edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </Box>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {appointment.patient}
                      {appointment.isOnline && (
                        <Chip
                          icon={<VideoCallIcon />}
                          label="Online"
                          size="small"
                          color="primary"
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {`${appointment.time} - ${appointment.type}`}
                    </Typography>
                  }
                />
                {appointment.status === 'Upcoming' ? (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={appointment.isOnline ? <VideoCallIcon /> : <CheckCircleIcon />}
                    sx={{ ml: 2 }}
                  >
                    {appointment.isOnline ? 'Start Call' : 'Start Session'}
                  </Button>
                ) : (
                  <Chip
                    label={appointment.status}
                    color="success"
                    sx={{ ml: 2 }}
                  />
                )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Appointments;
