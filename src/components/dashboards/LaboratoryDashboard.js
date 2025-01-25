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

// Mock data for laboratory dashboard
const mockTests = [
  { id: 1, patient: 'John Doe', test: 'Blood Test', status: 'Pending' },
  { id: 2, patient: 'Jane Smith', test: 'X-Ray', status: 'In Progress' },
  { id: 3, patient: 'Mike Brown', test: 'MRI Scan', status: 'Completed' },
];

const mockStats = {
  pendingTests: 10,
  inProgress: 5,
  completedToday: 8,
};

const LaboratoryDashboard = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Laboratory Overview
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Tests
              </Typography>
              <Typography variant="h4">
                {mockStats.pendingTests}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Tests in Progress
              </Typography>
              <Typography variant="h4">
                {mockStats.inProgress}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Completed Today
              </Typography>
              <Typography variant="h4">
                {mockStats.completedToday}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Tests List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Tests
            </Typography>
            <List>
              {mockTests.map((test, index) => (
                <React.Fragment key={test.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={`${test.patient} - ${test.test}`}
                      secondary={`Status: ${test.status}`}
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

export default LaboratoryDashboard;
