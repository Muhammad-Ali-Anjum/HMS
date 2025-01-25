import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Grid,
} from '@mui/material';
import axios from 'axios';

const MedicalHistory = () => {
  const [tabValue, setTabValue] = useState(0);
  const [medicalHistory, setMedicalHistory] = useState({
    conditions: [],
    treatments: [],
    surgeries: [],
    allergies: [],
    vaccinations: [],
  });

  useEffect(() => {
    fetchMedicalHistory();
  }, []);

  const fetchMedicalHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patient/medical-history');
      setMedicalHistory(response.data);
    } catch (error) {
      console.error('Error fetching medical history:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderConditions = () => (
    <List>
      {medicalHistory.conditions.map((condition, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <ListItemText
                  primary={condition.name}
                  secondary={`Diagnosed: ${new Date(
                    condition.diagnosedDate
                  ).toLocaleDateString()}`}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Chip
                  label={condition.status}
                  color={condition.status === 'Active' ? 'error' : 'success'}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="body2" color="textSecondary">
                  Treating Doctor: Dr. {condition.doctor}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );

  const renderTreatments = () => (
    <List>
      {medicalHistory.treatments.map((treatment, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <ListItemText
                  primary={treatment.name}
                  secondary={`Started: ${new Date(
                    treatment.startDate
                  ).toLocaleDateString()}`}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="body2">
                  Duration: {treatment.duration}
                </Typography>
                <Typography variant="body2">
                  Status: {treatment.status}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="body2" color="textSecondary">
                  Prescribed by: Dr. {treatment.doctor}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );

  const renderSurgeries = () => (
    <List>
      {medicalHistory.surgeries.map((surgery, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <ListItemText
                  primary={surgery.name}
                  secondary={`Date: ${new Date(
                    surgery.date
                  ).toLocaleDateString()}`}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="body2">
                  Hospital: {surgery.hospital}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="body2" color="textSecondary">
                  Surgeon: Dr. {surgery.surgeon}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );

  const renderAllergies = () => (
    <List>
      {medicalHistory.allergies.map((allergy, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <ListItemText
                  primary={allergy.name}
                  secondary={`Severity: ${allergy.severity}`}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body2">
                  Reaction: {allergy.reaction}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );

  const renderVaccinations = () => (
    <List>
      {medicalHistory.vaccinations.map((vaccination, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <ListItemText
                  primary={vaccination.name}
                  secondary={`Date: ${new Date(
                    vaccination.date
                  ).toLocaleDateString()}`}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="body2">
                  Dose: {vaccination.dose}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="body2" color="textSecondary">
                  Next Due: {new Date(vaccination.nextDue).toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Medical History
      </Typography>

      <Paper sx={{ mt: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Conditions" />
          <Tab label="Treatments" />
          <Tab label="Surgeries" />
          <Tab label="Allergies" />
          <Tab label="Vaccinations" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {tabValue === 0 && renderConditions()}
          {tabValue === 1 && renderTreatments()}
          {tabValue === 2 && renderSurgeries()}
          {tabValue === 3 && renderAllergies()}
          {tabValue === 4 && renderVaccinations()}
        </Box>
      </Paper>
    </Box>
  );
};

export default MedicalHistory;
