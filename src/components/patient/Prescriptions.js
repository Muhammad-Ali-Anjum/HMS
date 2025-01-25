import React, { useState, useEffect } from 'react';
import {
  Box,
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
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  LocalPharmacy as MedicineIcon,
  Schedule as ScheduleIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import axios from 'axios';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patient/prescriptions');
      setPrescriptions(response.data);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  const handlePrescriptionClick = (prescription) => {
    setSelectedPrescription(prescription);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPrescription(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'completed':
        return 'default';
      case 'expired':
        return 'error';
      default:
        return 'primary';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Prescriptions
      </Typography>

      <Grid container spacing={3}>
        {prescriptions.map((prescription) => (
          <Grid item xs={12} md={6} lg={4} key={prescription._id}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <MedicineIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">{prescription.medication}</Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography color="textSecondary" gutterBottom>
                    Prescribed by Dr. {prescription.doctor}
                  </Typography>
                  <Typography variant="body2">
                    Dosage: {prescription.dosage}
                  </Typography>
                  <Typography variant="body2">
                    Frequency: {prescription.frequency}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Chip
                    label={prescription.status}
                    color={getStatusColor(prescription.status)}
                    size="small"
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handlePrescriptionClick(prescription)}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedPrescription && (
          <>
            <DialogTitle>Prescription Details</DialogTitle>
            <DialogContent>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Medication"
                    secondary={selectedPrescription.medication}
                  />
                </ListItem>
                <Divider />

                <ListItem>
                  <ListItemText
                    primary="Prescribed By"
                    secondary={`Dr. ${selectedPrescription.doctor}`}
                  />
                </ListItem>
                <Divider />

                <ListItem>
                  <ListItemText
                    primary="Prescription Date"
                    secondary={new Date(
                      selectedPrescription.prescriptionDate
                    ).toLocaleDateString()}
                  />
                </ListItem>
                <Divider />

                <ListItem>
                  <ListItemText
                    primary="Duration"
                    secondary={`${selectedPrescription.duration} days`}
                  />
                </ListItem>
                <Divider />

                <ListItem>
                  <ListItemText
                    primary="Dosage"
                    secondary={selectedPrescription.dosage}
                  />
                </ListItem>
                <Divider />

                <ListItem>
                  <ListItemText
                    primary="Frequency"
                    secondary={selectedPrescription.frequency}
                  />
                </ListItem>
                <Divider />

                <ListItem>
                  <ListItemText
                    primary="Instructions"
                    secondary={selectedPrescription.instructions}
                  />
                </ListItem>
                <Divider />

                <ListItem>
                  <ListItemText
                    primary="Side Effects"
                    secondary={selectedPrescription.sideEffects}
                  />
                </ListItem>
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Prescriptions;
