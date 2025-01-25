import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Event as EventIcon,
  Edit as EditIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    appointmentType: 'Regular',
    selectedDoctor: '',
    reason: '',
  });

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patient/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setAppointmentData({
      date: '',
      time: '',
      appointmentType: 'Regular',
      selectedDoctor: '',
      reason: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const dateTime = new Date(`${appointmentData.date}T${appointmentData.time}`);
      
      await axios.post('http://localhost:5000/api/patient/appointments', {
        doctorId: appointmentData.selectedDoctor,
        date: dateTime,
        type: appointmentData.appointmentType,
        reason: appointmentData.reason,
      });
      handleDialogClose();
      fetchAppointments();
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/patient/appointments/${appointmentId}/cancel`
      );
      fetchAppointments();
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      case 'completed':
        return 'default';
      default:
        return 'primary';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">My Appointments</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleDialogOpen}
        >
          Book Appointment
        </Button>
      </Box>

      <Grid container spacing={3}>
        {appointments.map((appointment) => (
          <Grid item xs={12} md={6} lg={4} key={appointment._id}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <EventIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Appointment with Dr. {appointment.doctorName}
                  </Typography>
                </Box>

                <Typography variant="body1" gutterBottom>
                  {new Date(appointment.date).toLocaleDateString()}{' '}
                  {new Date(appointment.date).toLocaleTimeString()}
                </Typography>

                <Typography color="textSecondary" gutterBottom>
                  Type: {appointment.type}
                </Typography>

                <Typography variant="body2" gutterBottom>
                  Reason: {appointment.reason}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2,
                  }}
                >
                  <Chip
                    label={appointment.status}
                    color={getStatusColor(appointment.status)}
                  />
                  {appointment.status !== 'cancelled' &&
                    appointment.status !== 'completed' && (
                      <IconButton
                        color="error"
                        onClick={() => handleCancelAppointment(appointment._id)}
                      >
                        <CancelIcon />
                      </IconButton>
                    )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Book New Appointment</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Doctor"
                name="selectedDoctor"
                value={appointmentData.selectedDoctor}
                onChange={handleInputChange}
              >
                {doctors.map((doctor) => (
                  <MenuItem key={doctor._id} value={doctor._id}>
                    Dr. {doctor.name} - {doctor.specialization}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                name="date"
                value={appointmentData.date}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="time"
                label="Time"
                name="time"
                value={appointmentData.time}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Appointment Type"
                name="appointmentType"
                value={appointmentData.appointmentType}
                onChange={handleInputChange}
              >
                <MenuItem value="Regular">Regular Checkup</MenuItem>
                <MenuItem value="Follow-up">Follow-up</MenuItem>
                <MenuItem value="Emergency">Emergency</MenuItem>
                <MenuItem value="Consultation">Consultation</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Reason for Visit"
                name="reason"
                value={appointmentData.reason}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!appointmentData.selectedDoctor || !appointmentData.reason || !appointmentData.date || !appointmentData.time}
          >
            Book Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Appointments;
