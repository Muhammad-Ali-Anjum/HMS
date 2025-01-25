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
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
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

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchDoctorDetails();
  }, [id]);

  const fetchDoctorDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/doctors/${id}`);
      setDoctor(response.data);
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };

  if (!doctor) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Doctor Profile
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<ScheduleIcon />}
            onClick={() => navigate(`/doctors/${id}/schedule`)}
            sx={{ mr: 2 }}
          >
            View Schedule
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/doctors/${id}/edit`)}
          >
            Edit Profile
          </Button>
        </Box>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Grid container spacing={2} sx={{ p: 3 }}>
          <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
              src={doctor.profileImage}
            >
              <PersonIcon sx={{ fontSize: 60 }} />
            </Avatar>
            <Chip
              label={doctor.status}
              color={doctor.status === 'Available' ? 'success' : 'error'}
              sx={{ mb: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="textSecondary">
                  Name
                </Typography>
                <Typography variant="body1">{doctor.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="textSecondary">
                  Specialization
                </Typography>
                <Typography variant="body1">{doctor.specialization}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="textSecondary">
                  Email
                </Typography>
                <Typography variant="body1">{doctor.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" color="textSecondary">
                  Phone
                </Typography>
                <Typography variant="body1">{doctor.phone}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Current Patients" />
          <Tab label="Appointments" />
          <Tab label="Performance" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <List>
            {doctor.currentPatients?.map((patient) => (
              <ListItem
                key={patient._id}
                button
                onClick={() => navigate(`/patients/${patient._id}`)}
              >
                <ListItemText
                  primary={patient.name}
                  secondary={`Last Visit: ${new Date(patient.lastVisit).toLocaleDateString()}`}
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <List>
            {doctor.appointments?.map((appointment) => (
              <ListItem key={appointment._id}>
                <ListItemText
                  primary={appointment.patientName}
                  secondary={`${new Date(appointment.date).toLocaleDateString()} - ${appointment.time}`}
                />
                <Chip
                  label={appointment.status}
                  color={appointment.status === 'Scheduled' ? 'primary' : 'default'}
                  size="small"
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">Total Patients</Typography>
                <Typography variant="h4">{doctor.stats?.totalPatients}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">Monthly Appointments</Typography>
                <Typography variant="h4">{doctor.stats?.monthlyAppointments}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">Patient Satisfaction</Typography>
                <Typography variant="h4">{doctor.stats?.satisfaction}%</Typography>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </div>
  );
};

export default DoctorDetails;
