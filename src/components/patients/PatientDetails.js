import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Paper,
  Grid,
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchPatientDetails();
  }, [id]);

  const fetchPatientDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/patients/${id}`);
      setPatient(response.data);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  if (!patient) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Patient Details
        </Typography>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/patients/${id}/edit`)}
        >
          Edit Patient
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Grid container spacing={2} sx={{ p: 3 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Name
            </Typography>
            <Typography variant="body1">{patient.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Email
            </Typography>
            <Typography variant="body1">{patient.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Phone
            </Typography>
            <Typography variant="body1">{patient.phone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Date of Birth
            </Typography>
            <Typography variant="body1">
              {new Date(patient.dateOfBirth).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Medical History" />
          <Tab label="Appointments" />
          <Tab label="Prescriptions" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <List>
            <ListItem>
              <ListItemText
                primary="Allergies"
                secondary={patient.medicalHistory?.allergies?.join(', ') || 'None'}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Chronic Conditions"
                secondary={patient.medicalHistory?.chronicConditions?.join(', ') || 'None'}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Past Surgeries"
                secondary={patient.medicalHistory?.surgeries?.join(', ') || 'None'}
              />
            </ListItem>
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <List>
            {patient.appointments?.map((appointment) => (
              <ListItem key={appointment._id}>
                <ListItemText
                  primary={new Date(appointment.date).toLocaleDateString()}
                  secondary={appointment.purpose}
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <List>
            {patient.prescriptions?.map((prescription) => (
              <ListItem key={prescription._id}>
                <ListItemText
                  primary={prescription.medication}
                  secondary={`Dosage: ${prescription.dosage}, Instructions: ${prescription.instructions}`}
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>
      </Paper>
    </div>
  );
};

export default PatientDetails;
