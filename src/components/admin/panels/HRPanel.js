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
  People as PeopleIcon,
  Person as PersonIcon,
  AttachMoney as MoneyIcon,
  Assignment as AssignmentIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

const HRPanel = () => {
  // Mock data - replace with actual API calls
  const employees = [
    {
      id: 1,
      name: 'Dr. John Smith',
      department: 'Cardiology',
      position: 'Senior Doctor',
      status: 'Active',
      joiningDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Sarah Williams',
      department: 'Nursing',
      position: 'Head Nurse',
      status: 'On Leave',
      joiningDate: '2024-02-01',
    },
  ];

  const recentPayroll = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      amount: '$8,500',
      date: '2025-01-23',
      status: 'Processed',
    },
    {
      id: 2,
      name: 'Michael Brown',
      amount: '$4,200',
      date: '2025-01-23',
      status: 'Pending',
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'on leave':
        return 'warning';
      case 'terminated':
        return 'error';
      case 'processed':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        HR & Payroll Management
      </Typography>

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Employees
              </Typography>
              <Typography variant="h3">245</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Employees
              </Typography>
              <Typography variant="h3">228</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                On Leave
              </Typography>
              <Typography variant="h3">12</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Monthly Payroll
              </Typography>
              <Typography variant="h3">$485K</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Employee List */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Employee Directory</Typography>
                <Button
                  variant="contained"
                  startIcon={<PersonIcon />}
                  color="primary"
                >
                  Add Employee
                </Button>
              </Box>
              <List>
                {employees.map((employee) => (
                  <React.Fragment key={employee.id}>
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
                            {employee.name}
                            <Chip
                              label={employee.status}
                              size="small"
                              color={getStatusColor(employee.status)}
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                        secondary={
                          <>
                            {employee.position} • {employee.department} • Joined: {employee.joiningDate}
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

        {/* Recent Payroll */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Payroll
              </Typography>
              <List>
                {recentPayroll.map((payroll) => (
                  <React.Fragment key={payroll.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <MoneyIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {payroll.name}
                            <Chip
                              label={payroll.status}
                              size="small"
                              color={getStatusColor(payroll.status)}
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                        secondary={`${payroll.amount} • ${payroll.date}`}
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
                    New Employee
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<MoneyIcon />}
                    color="secondary"
                  >
                    Process Payroll
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<EventIcon />}
                    color="info"
                  >
                    Leave Management
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<AssessmentIcon />}
                    color="success"
                  >
                    Generate Reports
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

export default HRPanel;
