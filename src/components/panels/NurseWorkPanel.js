import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import {
  Person as PersonIcon,
  Medication as MedicationIcon,
  Assignment as AssignmentIcon,
  MonitorHeart as MonitorHeartIcon,
  Message as MessageIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

// Tab Panel Component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nurse-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const NurseWorkPanel = () => {
  const [tabValue, setTabValue] = useState(0);

  // Mock data
  const patients = [
    { 
      id: 1, 
      name: 'John Doe', 
      room: '101',
      vitals: { bp: '120/80', temp: '98.6°F', pulse: '72' },
      nextMedication: '10:00 AM'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      room: '102',
      vitals: { bp: '118/75', temp: '98.8°F', pulse: '68' },
      nextMedication: '10:30 AM'
    },
  ];

  const medications = [
    { 
      id: 1, 
      patient: 'John Doe',
      medication: 'Lisinopril',
      dosage: '10mg',
      time: '10:00 AM',
      status: 'Pending'
    },
    { 
      id: 2, 
      patient: 'Jane Smith',
      medication: 'Metformin',
      dosage: '500mg',
      time: '10:30 AM',
      status: 'Pending'
    },
  ];

  const tasks = [
    { 
      id: 1, 
      task: 'Change dressing',
      patient: 'John Doe',
      room: '101',
      priority: 'High',
      status: 'Pending'
    },
    { 
      id: 2, 
      task: 'Check vitals',
      patient: 'Jane Smith',
      room: '102',
      priority: 'Medium',
      status: 'Pending'
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Nurse's Dashboard
      </Typography>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Assigned Patients</Typography>
              <Typography variant="h4">6</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Pending Medications</Typography>
              <Typography variant="h4">8</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Tasks Due</Typography>
              <Typography variant="h4">4</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Completed Tasks</Typography>
              <Typography variant="h4">12</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<PersonIcon />} label="Patients" />
          <Tab icon={<MedicationIcon />} label="Medications" />
          <Tab icon={<AssignmentIcon />} label="Tasks" />
          <Tab icon={<MonitorHeartIcon />} label="Vitals" />
          <Tab icon={<MessageIcon />} label="Communications" />
        </Tabs>

        {/* Patients Tab */}
        <TabPanel value={tabValue} index={0}>
          <List>
            {patients.map((patient) => (
              <React.Fragment key={patient.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar><PersonIcon /></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${patient.name} - Room ${patient.room}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          BP: {patient.vitals.bp} | Temp: {patient.vitals.temp} | Pulse: {patient.vitals.pulse}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          Next Medication: {patient.nextMedication}
                        </Typography>
                      </>
                    }
                  />
                  <Button variant="outlined" color="primary" sx={{ mr: 1 }}>
                    Update Vitals
                  </Button>
                  <Button variant="contained" color="primary">
                    View Details
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </TabPanel>

        {/* Medications Tab */}
        <TabPanel value={tabValue} index={1}>
          <List>
            {medications.map((med) => (
              <React.Fragment key={med.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar><MedicationIcon /></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${med.patient} - ${med.medication} ${med.dosage}`}
                    secondary={`Time: ${med.time} | Status: ${med.status}`}
                  />
                  <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<CheckCircleIcon />}
                  >
                    Mark as Given
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </TabPanel>

        {/* Tasks Tab */}
        <TabPanel value={tabValue} index={2}>
          <List>
            {tasks.map((task) => (
              <React.Fragment key={task.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar><AssignmentIcon /></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={task.task}
                    secondary={`Patient: ${task.patient} - Room ${task.room}`}
                  />
                  <Chip 
                    label={task.priority} 
                    color={task.priority === 'High' ? 'error' : 'primary'} 
                    size="small" 
                    sx={{ mr: 1 }}
                  />
                  <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<CheckCircleIcon />}
                  >
                    Complete
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </TabPanel>

        {/* Vitals Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            {patients.map((patient) => (
              <Grid item xs={12} md={6} key={patient.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {patient.name} - Room {patient.room}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography variant="subtitle2">Blood Pressure</Typography>
                        <Typography variant="h6">{patient.vitals.bp}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle2">Temperature</Typography>
                        <Typography variant="h6">{patient.vitals.temp}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle2">Pulse</Typography>
                        <Typography variant="h6">{patient.vitals.pulse}</Typography>
                      </Grid>
                    </Grid>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth 
                      sx={{ mt: 2 }}
                    >
                      Update Vitals
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Communications Tab */}
        <TabPanel value={tabValue} index={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<MessageIcon />}
                fullWidth
                sx={{ mb: 2 }}
              >
                New Message to Doctor
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Recent Communications
              </Typography>
              {/* Add communications list */}
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default NurseWorkPanel;
