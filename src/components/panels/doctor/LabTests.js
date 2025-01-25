import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  Paper,
} from '@mui/material';
import {
  Science as ScienceIcon,
  Assignment as AssignmentIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import SearchBar from '../../common/SearchBar';

const LabTests = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [labTests] = useState([
    {
      id: 1,
      patient: 'John Doe',
      testName: 'Blood Test',
      date: '2025-01-24',
      status: 'Pending',
      priority: 'High',
    },
    {
      id: 2,
      patient: 'Jane Smith',
      testName: 'X-Ray',
      date: '2025-01-24',
      status: 'Completed',
      priority: 'Normal',
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      testName: 'MRI Scan',
      date: '2025-01-25',
      status: 'In Progress',
      priority: 'Urgent',
    },
  ]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTests = labTests.filter(test => {
    const searchStr = searchQuery.toLowerCase();
    return (
      test.patient.toLowerCase().includes(searchStr) ||
      test.testName.toLowerCase().includes(searchStr) ||
      test.status.toLowerCase().includes(searchStr)
    );
  });

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs>
          <Typography variant="h4">
            Laboratory Tests
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <SearchBar
            placeholder="Search lab tests..."
            value={searchQuery}
            onChange={handleSearch}
            onClear={() => setSearchQuery('')}
          />
        </Grid>
      </Grid>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Tests
              </Typography>
              <Typography variant="h4">24</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending
              </Typography>
              <Typography variant="h4">8</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h4">5</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completed
              </Typography>
              <Typography variant="h4">11</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Lab Tests List */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Test Orders</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Order New Test
          </Button>
        </Box>

        <List>
          {filteredTests.map((test) => (
            <React.Fragment key={test.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ScienceIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {test.testName}
                      <Chip
                        label={test.priority}
                        size="small"
                        color={
                          test.priority === 'Urgent' ? 'error' :
                          test.priority === 'High' ? 'warning' : 'default'
                        }
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  }
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {`Patient: ${test.patient} | Date: ${test.date}`}
                    </Typography>
                  }
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<AssignmentIcon />}
                  >
                    View Results
                  </Button>
                  <Chip
                    label={test.status}
                    color={
                      test.status === 'Completed' ? 'success' :
                      test.status === 'In Progress' ? 'warning' : 'default'
                    }
                  />
                </Box>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default LabTests;
