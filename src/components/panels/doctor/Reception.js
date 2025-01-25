import React, { useState } from 'react';
import {
  Box,
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
  Paper,
} from '@mui/material';
import {
  Receipt as ReceiptIcon,
  Person as PersonIcon,
  EventAvailable as EventAvailableIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import SearchBar from '../../common/SearchBar';

const Reception = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments] = useState([
    {
      id: 1,
      patient: 'John Doe',
      time: '10:00 AM',
      date: '2025-01-24',
      type: 'New Patient',
      status: 'Confirmed',
    },
    {
      id: 2,
      patient: 'Jane Smith',
      time: '11:30 AM',
      date: '2025-01-24',
      type: 'Follow-up',
      status: 'Waiting',
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      time: '02:00 PM',
      date: '2025-01-24',
      type: 'Consultation',
      status: 'In Progress',
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
            Reception
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
              <Typography variant="h4">15</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Waiting
              </Typography>
              <Typography variant="h4">3</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completed
              </Typography>
              <Typography variant="h4">8</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                New Patients
              </Typography>
              <Typography variant="h4">4</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Appointments List */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Today's Schedule</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            New Appointment
          </Button>
        </Box>

        <List>
          {filteredAppointments.map((appointment) => (
            <React.Fragment key={appointment.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {appointment.patient}
                      <Chip
                        label={appointment.type}
                        size="small"
                        color="primary"
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  }
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {`${appointment.date} at ${appointment.time}`}
                    </Typography>
                  }
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<EventAvailableIcon />}
                  >
                    Check In
                  </Button>
                  <Chip
                    label={appointment.status}
                    color={
                      appointment.status === 'Confirmed' ? 'success' :
                      appointment.status === 'Waiting' ? 'warning' :
                      appointment.status === 'In Progress' ? 'info' : 'default'
                    }
                  />
                </Box>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Reception;
