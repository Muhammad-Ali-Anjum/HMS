import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Person as PersonIcon,
  MedicalServices as MedicalServicesIcon,
  LocalHospital as LocalHospitalIcon,
  Assignment as AssignmentIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';

const PatientPanel = () => {
  // Mock data - replace with actual API calls
  const patients = [
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      doctor: 'Dr. Smith',
      lastVisit: '2025-01-15',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 32,
      doctor: 'Dr. Johnson',
      lastVisit: '2025-01-20',
      status: 'Admitted',
    },
  ];

  const recentAdmissions = [
    {
      id: 1,
      name: 'Alice Brown',
      room: '201',
      doctor: 'Dr. Wilson',
      condition: 'Stable',
    },
    {
      id: 2,
      name: 'Bob Wilson',
      room: '305',
      doctor: 'Dr. Davis',
      condition: 'Critical',
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'admitted':
        return 'warning';
      case 'discharged':
        return 'info';
      case 'critical':
        return 'error';
      case 'stable':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Patient Management Panel
      </Typography>

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Patients
              </Typography>
              <Typography variant="h3">1,245</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Admitted Patients
              </Typography>
              <Typography variant="h3">85</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Today's Appointments
              </Typography>
              <Typography variant="h3">32</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                New Patients (This Month)
              </Typography>
              <Typography variant="h3">124</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Patients List */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Recent Patients</Typography>
                <Button
                  variant="contained"
                  startIcon={<PersonIcon />}
                  color="primary"
                >
                  Add New Patient
                </Button>
              </Box>
              <List>
                {patients.map((patient) => (
                  <React.Fragment key={patient.id}>
                    <ListItem
                      secondaryAction={
                        <Box>
                          <IconButton edge="end" aria-label="edit">
                            <EditIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {patient.name}
                            <Chip
                              label={patient.status}
                              size="small"
                              color={getStatusColor(patient.status)}
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                        secondary={
                          <>
                            Age: {patient.age} • Doctor: {patient.doctor} • Last Visit: {patient.lastVisit}
                          </>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Admissions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Admissions
              </Typography>
              <List>
                {recentAdmissions.map((admission) => (
                  <React.Fragment key={admission.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <LocalHospitalIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {admission.name}
                            <Chip
                              label={admission.condition}
                              size="small"
                              color={getStatusColor(admission.condition)}
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                        secondary={`Room ${admission.room} • Dr. ${admission.doctor}`}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<PersonIcon />}
                    color="primary"
                  >
                    Register Patient
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<EventIcon />}
                    color="secondary"
                  >
                    Schedule Appointment
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<MedicalServicesIcon />}
                    color="info"
                  >
                    Admit Patient
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<ReceiptIcon />}
                    color="success"
                  >
                    Generate Bill
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientPanel;
