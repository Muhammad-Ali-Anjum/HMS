import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Tabs,
  Tab,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Chip,
} from '@mui/material';
import {
  Save as SaveIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import axios from 'axios';

const PatientDetails = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [patient, setPatient] = useState(null);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetchPatientDetails();
  }, [id]);

  const fetchPatientDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/doctor/patients/${id}`);
      setPatient(response.data);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddNote = async () => {
    try {
      await axios.post(`http://localhost:5000/api/doctor/patients/${id}/notes`, {
        note: newNote,
      });
      setNewNote('');
      fetchPatientDetails();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  if (!patient) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">{patient.name}</Typography>
            <Typography color="textSecondary" gutterBottom>
              Patient ID: {patient.id}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
            <Chip
              label={patient.status}
              color={patient.status === 'Critical' ? 'error' : 'success'}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Basic Information" />
          <Tab label="Medical History" />
          <Tab label="Prescriptions" />
          <Tab label="Notes" />
        </Tabs>

        {tabValue === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Personal Information</Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Age" secondary={patient.age} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Gender" secondary={patient.gender} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Contact Number"
                    secondary={patient.contactNumber}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Email" secondary={patient.email} />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Emergency Contact</Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Name"
                    secondary={patient.emergencyContact?.name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Relationship"
                    secondary={patient.emergencyContact?.relationship}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Contact Number"
                    secondary={patient.emergencyContact?.phone}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        )}

        {tabValue === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Medical History
            </Typography>
            <List>
              {patient.medicalHistory?.map((record, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={record.condition}
                      secondary={`Diagnosed: ${new Date(
                        record.diagnosedDate
                      ).toLocaleDateString()}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ mt: 2 }}
            >
              Add Medical Record
            </Button>
          </Box>
        )}

        {tabValue === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Prescriptions
            </Typography>
            <List>
              {patient.prescriptions?.map((prescription, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={prescription.medication}
                      secondary={`Dosage: ${prescription.dosage} | Prescribed: ${new Date(
                        prescription.date
                      ).toLocaleDateString()}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ mt: 2 }}
            >
              Add Prescription
            </Button>
          </Box>
        )}

        {tabValue === 3 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Doctor's Notes
            </Typography>
            <List>
              {patient.notes?.map((note, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={note.content}
                      secondary={`Added by: Dr. ${note.doctor} on ${new Date(
                        note.date
                      ).toLocaleDateString()}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Add a note"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleAddNote}
                disabled={!newNote.trim()}
              >
                Save Note
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default PatientDetails;
