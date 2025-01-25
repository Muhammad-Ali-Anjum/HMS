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
  Videocam as VideocamIcon,
  Person as PersonIcon,
  Chat as ChatIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import SearchBar from '../../common/SearchBar';

const Telehealth = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [consultations] = useState([
    {
      id: 1,
      patient: 'John Doe',
      time: '10:00 AM',
      date: '2025-01-24',
      status: 'Scheduled',
      type: 'Video Call',
    },
    {
      id: 2,
      patient: 'Jane Smith',
      time: '11:30 AM',
      date: '2025-01-24',
      status: 'In Progress',
      type: 'Chat',
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      time: '02:00 PM',
      date: '2025-01-24',
      status: 'Completed',
      type: 'Video Call',
    },
  ]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredConsultations = consultations.filter(consultation => {
    const searchStr = searchQuery.toLowerCase();
    return (
      consultation.patient.toLowerCase().includes(searchStr) ||
      consultation.type.toLowerCase().includes(searchStr) ||
      consultation.status.toLowerCase().includes(searchStr)
    );
  });

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs>
          <Typography variant="h4">
            Telehealth
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <SearchBar
            placeholder="Search consultations..."
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
                Today's Consultations
              </Typography>
              <Typography variant="h4">8</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Scheduled
              </Typography>
              <Typography variant="h4">5</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h4">1</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completed Today
              </Typography>
              <Typography variant="h4">2</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Consultations List */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Virtual Consultations</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ScheduleIcon />}
          >
            Schedule Consultation
          </Button>
        </Box>

        <List>
          {filteredConsultations.map((consultation) => (
            <React.Fragment key={consultation.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    {consultation.type === 'Video Call' ? <VideocamIcon /> : <ChatIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {consultation.patient}
                      <Chip
                        icon={consultation.type === 'Video Call' ? <VideocamIcon /> : <ChatIcon />}
                        label={consultation.type}
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
                      {`${consultation.date} at ${consultation.time}`}
                    </Typography>
                  }
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {consultation.status === 'Scheduled' && (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={consultation.type === 'Video Call' ? <VideocamIcon /> : <ChatIcon />}
                    >
                      Join Session
                    </Button>
                  )}
                  <Chip
                    label={consultation.status}
                    color={
                      consultation.status === 'Completed' ? 'success' :
                      consultation.status === 'In Progress' ? 'warning' : 'default'
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

export default Telehealth;
