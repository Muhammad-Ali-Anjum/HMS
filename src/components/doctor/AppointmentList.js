import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  Event as EventIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import axios from 'axios';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctor/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/doctor/appointments/${appointmentId}`, {
        status,
      });
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const handleAddNotes = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/doctor/appointments/${selectedAppointment._id}/notes`,
        { notes }
      );
      setOpenDialog(false);
      setNotes('');
      fetchAppointments();
    } catch (error) {
      console.error('Error adding notes:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      case 'in progress':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>

      <Grid container spacing={3}>
        {appointments.map((appointment) => (
          <Grid item xs={12} md={6} lg={4} key={appointment._id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EventIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    {new Date(appointment.date).toLocaleDateString()}{' '}
                    {new Date(appointment.date).toLocaleTimeString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PersonIcon sx={{ mr: 1 }} />
                  <Typography>{appointment.patientName}</Typography>
                </Box>

                <Typography color="textSecondary" gutterBottom>
                  Type: {appointment.type}
                </Typography>

                <Typography variant="body2" gutterBottom>
                  Reason: {appointment.reason}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Chip
                    label={appointment.status}
                    color={getStatusColor(appointment.status)}
                    sx={{ mr: 1 }}
                  />
                  {appointment.status === 'scheduled' && (
                    <>
                      <Button
                        size="small"
                        onClick={() =>
                          handleUpdateStatus(appointment._id, 'in progress')
                        }
                        sx={{ mr: 1 }}
                      >
                        Start
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() =>
                          handleUpdateStatus(appointment._id, 'cancelled')
                        }
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  {appointment.status === 'in progress' && (
                    <>
                      <Button
                        size="small"
                        color="success"
                        onClick={() =>
                          handleUpdateStatus(appointment._id, 'completed')
                        }
                        sx={{ mr: 1 }}
                      >
                        Complete
                      </Button>
                      <Button
                        size="small"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setOpenDialog(true);
                        }}
                      >
                        Add Notes
                      </Button>
                    </>
                  )}
                </Box>

                {appointment.notes && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      Notes: {appointment.notes}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Appointment Notes</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddNotes} variant="contained">
            Save Notes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppointmentList;
