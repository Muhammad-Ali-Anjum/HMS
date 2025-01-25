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
  Science as ScienceIcon,
  Assignment as AssignmentIcon,
  LocalHospital as HospitalIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
  Assessment as AssessmentIcon,
  Print as PrintIcon,
} from '@mui/icons-material';

const LaboratoryPanel = () => {
  // Mock data - replace with actual API calls
  const testRequests = [
    {
      id: 1,
      patient: 'John Doe',
      test: 'Blood Test',
      doctor: 'Dr. Smith',
      priority: 'High',
      status: 'Pending',
    },
    {
      id: 2,
      patient: 'Jane Smith',
      test: 'X-Ray',
      doctor: 'Dr. Johnson',
      priority: 'Normal',
      status: 'In Progress',
    },
  ];

  const recentResults = [
    {
      id: 1,
      patient: 'Alice Brown',
      test: 'MRI Scan',
      date: '2025-01-23',
      status: 'Completed',
    },
    {
      id: 2,
      patient: 'Bob Wilson',
      test: 'CT Scan',
      date: '2025-01-23',
      status: 'Ready',
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'in progress':
        return 'warning';
      case 'pending':
        return 'info';
      case 'ready':
        return 'secondary';
      case 'high':
        return 'error';
      case 'normal':
        return 'primary';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Laboratory Management Panel
      </Typography>

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Today's Tests
              </Typography>
              <Typography variant="h3">45</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Results
              </Typography>
              <Typography variant="h3">12</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completed Today
              </Typography>
              <Typography variant="h3">28</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Equipment Status
              </Typography>
              <Typography variant="h3">95%</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Test Requests */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Test Requests</Typography>
                <Button
                  variant="contained"
                  startIcon={<AssignmentIcon />}
                  color="primary"
                >
                  New Test Request
                </Button>
              </Box>
              <List>
                {testRequests.map((request) => (
                  <React.Fragment key={request.id}>
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
                          <ScienceIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {request.patient}
                            <Chip
                              label={request.priority}
                              size="small"
                              color={getStatusColor(request.priority)}
                              sx={{ ml: 1 }}
                            />
                            <Chip
                              label={request.status}
                              size="small"
                              color={getStatusColor(request.status)}
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                        secondary={
                          <>
                            {request.test} • Referred by: {request.doctor}
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

        {/* Recent Results */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Results
              </Typography>
              <List>
                {recentResults.map((result) => (
                  <React.Fragment key={result.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <AssessmentIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {result.patient}
                            <Chip
                              label={result.status}
                              size="small"
                              color={getStatusColor(result.status)}
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                        secondary={`${result.test} - ${result.date}`}
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
                    startIcon={<AssignmentIcon />}
                    color="primary"
                  >
                    New Test
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<AssessmentIcon />}
                    color="secondary"
                  >
                    Enter Results
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<WarningIcon />}
                    color="warning"
                  >
                    Critical Results
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<PrintIcon />}
                    color="info"
                  >
                    Print Reports
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

export default LaboratoryPanel;
