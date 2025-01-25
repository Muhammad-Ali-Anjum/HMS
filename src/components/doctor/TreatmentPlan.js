import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import axios from 'axios';

const TreatmentPlan = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [treatmentPlan, setTreatmentPlan] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTreatment, setNewTreatment] = useState({
    treatment: '',
    duration: '',
    instructions: '',
    goals: '',
  });

  useEffect(() => {
    fetchPatientAndTreatment();
  }, [patientId]);

  const fetchPatientAndTreatment = async () => {
    try {
      const [patientRes, treatmentRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/doctor/patients/${patientId}`),
        axios.get(`http://localhost:5000/api/doctor/treatment-plans/${patientId}`),
      ]);
      setPatient(patientRes.data);
      setTreatmentPlan(treatmentRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewTreatment({
      treatment: '',
      duration: '',
      instructions: '',
      goals: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTreatment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTreatment = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/doctor/treatment-plans/${patientId}`,
        newTreatment
      );
      handleDialogClose();
      fetchPatientAndTreatment();
    } catch (error) {
      console.error('Error adding treatment:', error);
    }
  };

  const handleDeleteTreatment = async (treatmentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/doctor/treatment-plans/${patientId}/${treatmentId}`
      );
      fetchPatientAndTreatment();
    } catch (error) {
      console.error('Error deleting treatment:', error);
    }
  };

  if (!patient || !treatmentPlan) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">Treatment Plan</Typography>
            <Typography color="textSecondary">
              Patient: {patient.name} (ID: {patient.id})
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleDialogOpen}
            >
              Add Treatment
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <List>
          {treatmentPlan.treatments?.map((treatment, index) => (
            <React.Fragment key={index}>
              <ListItem
                secondaryAction={
                  <Box>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteTreatment(treatment._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={treatment.treatment}
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2">
                        Duration: {treatment.duration}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        Instructions: {treatment.instructions}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        Goals: {treatment.goals}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Treatment</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Treatment"
                name="treatment"
                value={newTreatment.treatment}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Duration"
                name="duration"
                value={newTreatment.duration}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Instructions"
                name="instructions"
                value={newTreatment.instructions}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Goals"
                name="goals"
                value={newTreatment.goals}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddTreatment}
            disabled={!newTreatment.treatment || !newTreatment.duration}
          >
            Add Treatment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TreatmentPlan;
