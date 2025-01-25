import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Cancel as CancelIcon,
  Schedule as RescheduleIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';

const PatientAppointments = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [reason, setReason] = useState('');

  // Mock data - replace with actual API calls
  const appointments = [
    {
      id: 1,
      doctor: 'Dr. John Smith',
      date: '2025-01-15',
      time: '10:00 AM',
      type: 'Check-up',
      status: 'Confirmed',
    },
    {
      id: 2,
      doctor: 'Dr. Sarah Johnson',
      date: '2025-01-20',
      time: '02:30 PM',
      type: 'Follow-up',
      status: 'Pending',
    },
    // Add more mock data as needed
  ];

  const doctors = [
    { id: 1, name: 'Dr. John Smith', specialization: 'Cardiology' },
    { id: 2, name: 'Dr. Sarah Johnson', specialization: 'Pediatrics' },
    // Add more mock data as needed
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setSelectedDoctor('');
    setReason('');
  };

  const handleBookAppointment = () => {
    // Handle booking appointment
    handleCloseDialog();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h2">
          My Appointments
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Book Appointment
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Upcoming Appointment Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarIcon sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Next Appointment
                </Typography>
              </Box>
              {appointments[0] && (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    {appointments[0].doctor}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {appointments[0].date} at {appointments[0].time}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {appointments[0].type}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={appointments[0].status}
                      color={getStatusColor(appointments[0].status)}
                      size="small"
                    />
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* All Appointments List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              All Appointments
            </Typography>
            <List>
              {appointments.map((appointment) => (
                <React.Fragment key={appointment.id}>
                  <ListItem>
                    <ListItemText
                      primary={appointment.doctor}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            {appointment.date} at {appointment.time}
                          </Typography>
                          <br />
                          {appointment.type}
                        </>
                      }
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
                        aria-label="reschedule"
                        onClick={() => {/* Handle reschedule */}}
                        sx={{ mr: 1 }}
                      >
                        <RescheduleIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="cancel"
                        onClick={() => {/* Handle cancel */}}
                        color="error"
                      >
                        <CancelIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Book Appointment Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Book New Appointment</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              select
              label="Doctor"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              fullWidth
            >
              {doctors.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialization}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              type="date"
              label="Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              select
              label="Time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              fullWidth
            >
              <MenuItem value="09:00">09:00 AM</MenuItem>
              <MenuItem value="10:00">10:00 AM</MenuItem>
              <MenuItem value="11:00">11:00 AM</MenuItem>
              <MenuItem value="14:00">02:00 PM</MenuItem>
              <MenuItem value="15:00">03:00 PM</MenuItem>
              <MenuItem value="16:00">04:00 PM</MenuItem>
            </TextField>

            <TextField
              label="Reason for Visit"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleBookAppointment}
            disabled={!selectedDoctor || !selectedDate || !selectedTime || !reason}
          >
            Book Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientAppointments;
