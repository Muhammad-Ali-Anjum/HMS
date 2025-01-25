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
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
  Message as MessageIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MedicalServices as MedicalServicesIcon,
} from '@mui/icons-material';

const NursePanel = () => {
  // Mock data - replace with actual API calls
  const nurses = [
    {
      id: 1,
      name: 'Sarah Williams',
      department: 'Emergency',
      shift: 'Morning',
      patients: 12,
      status: 'On Duty',
    },
    {
      id: 2,
      name: 'Michael Brown',
      department: 'ICU',
      shift: 'Night',
      patients: 8,
      status: 'Break',
    },
    // Add more mock data
  ];

  const tasks = [
    {
      id: 1,
      patient: 'Room 201 - John Doe',
      task: 'Medication Administration',
      time: '10:00 AM',
      priority: 'High',
    },
    {
      id: 2,
      patient: 'Room 305 - Alice Smith',
      task: 'Vital Signs Check',
      time: '10:30 AM',
      priority: 'Medium',
    },
    // Add more mock data
  ];

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Nurse Management Panel
      </Typography>

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Nurses
              </Typography>
              <Typography variant="h3">45</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                On Duty
              </Typography>
              <Typography variant="h3">28</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Patients
              </Typography>
              <Typography variant="h3">120</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Tasks
              </Typography>
              <Typography variant="h3">15</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Nurse List */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Nurses List</Typography>
                <Button variant="contained" color="primary">
                  Add New Nurse
                </Button>
              </Box>
              <List>
                {nurses.map((nurse) => (
                  <React.Fragment key={nurse.id}>
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
                        primary={nurse.name}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              {nurse.department} - {nurse.shift} Shift
                            </Typography>
                            {` — Patients: ${nurse.patients} • ${nurse.status}`}
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

        {/* Tasks List */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Tasks
              </Typography>
              <List>
                {tasks.map((task) => (
                  <React.Fragment key={task.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <MedicalServicesIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={task.patient}
                        secondary={
                          <Box>
                            {task.task}
                            <br />
                            {task.time}
                            <Chip
                              label={task.priority}
                              size="small"
                              color={getPriorityColor(task.priority)}
                              sx={{ ml: 1 }}
                            />
                          </Box>
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
                    Add Nurse
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<ScheduleIcon />}
                    color="secondary"
                  >
                    Manage Shifts
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<AssignmentIcon />}
                    color="info"
                  >
                    Assign Tasks
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<MessageIcon />}
                    color="success"
                  >
                    Send Message
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

export default NursePanel;
