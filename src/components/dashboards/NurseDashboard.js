import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

// Mock data for nurse dashboard
const mockPatients = [
  { id: 1, name: 'John Doe', room: '101', status: 'Regular Check' },
  { id: 2, name: 'Jane Smith', room: '102', status: 'Post-Op Care' },
  { id: 3, name: 'Mike Johnson', room: '103', status: 'Medication Due' },
];

const mockStats = {
  assignedPatients: 12,
  medicationsDue: 5,
  completedTasks: 8,
};

const NurseDashboard = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, Nurse {user?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's your shift overview
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Assigned Patients
              </Typography>
              <Typography variant="h4">
                {mockStats.assignedPatients}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Medications Due
              </Typography>
              <Typography variant="h4">
                {mockStats.medicationsDue}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Completed Tasks
              </Typography>
              <Typography variant="h4">
                {mockStats.completedTasks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Patient List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Current Patients
            </Typography>
            <List>
              {mockPatients.map((patient, index) => (
                <React.Fragment key={patient.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={`${patient.name} - Room ${patient.room}`}
                      secondary={patient.status}
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NurseDashboard;
