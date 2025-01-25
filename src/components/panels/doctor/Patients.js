import React, { useState } from 'react';
import {
  Box,
  Paper,
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
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Person as PersonIcon,
  Search as SearchIcon,
  Assignment as AssignmentIcon,
  LocalHospital as LocalHospitalIcon,
  Science as ScienceIcon,
} from '@mui/icons-material';
import SearchBar from '../../common/SearchBar';

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients] = useState([
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      condition: 'Hypertension',
      lastVisit: '2025-01-20',
      nextAppointment: '2025-01-24',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 32,
      gender: 'Female',
      condition: 'Diabetes',
      lastVisit: '2025-01-22',
      nextAppointment: '2025-01-25',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      age: 28,
      gender: 'Male',
      condition: 'Asthma',
      lastVisit: '2025-01-21',
      nextAppointment: '2025-01-28',
    },
  ]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPatients = patients.filter(patient => {
    const searchStr = searchQuery.toLowerCase();
    return (
      patient.name.toLowerCase().includes(searchStr) ||
      patient.condition.toLowerCase().includes(searchStr) ||
      patient.gender.toLowerCase().includes(searchStr) ||
      patient.lastVisit.includes(searchStr)
    );
  });

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs>
          <Typography variant="h4">
            Patients
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <SearchBar
            placeholder="Search patients..."
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
                Total Patients
              </Typography>
              <Typography variant="h4">150</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                New This Month
              </Typography>
              <Typography variant="h4">12</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Reports
              </Typography>
              <Typography variant="h4">5</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Critical Cases
              </Typography>
              <Typography variant="h4">3</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Patients List */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Patient List
        </Typography>

        <List>
          {filteredPatients.map((patient) => (
            <React.Fragment key={patient.id}>
              <ListItem>
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
                        label={patient.condition}
                        size="small"
                        color="primary"
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
                      {`Age: ${patient.age} | Gender: ${patient.gender} | Last Visit: ${patient.lastVisit}`}
                    </Typography>
                  }
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<AssignmentIcon />}
                  >
                    Medical Record
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ScienceIcon />}
                  >
                    Lab Results
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                  >
                    View Profile
                  </Button>
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

export default Patients;
