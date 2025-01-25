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
  School as SchoolIcon,
  Book as BookIcon,
  VideoLibrary as VideoIcon,
  Article as ArticleIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import SearchBar from '../../common/SearchBar';

const Education = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [resources] = useState([
    {
      id: 1,
      title: 'Latest Advances in Cardiology',
      type: 'Course',
      date: '2025-01-24',
      duration: '2 hours',
      status: 'In Progress',
    },
    {
      id: 2,
      title: 'Patient Care Best Practices',
      type: 'Video',
      date: '2025-01-23',
      duration: '45 minutes',
      status: 'Completed',
    },
    {
      id: 3,
      title: 'Medical Research Updates',
      type: 'Article',
      date: '2025-01-22',
      duration: '15 minutes',
      status: 'New',
    },
  ]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredResources = resources.filter(resource => {
    const searchStr = searchQuery.toLowerCase();
    return (
      resource.title.toLowerCase().includes(searchStr) ||
      resource.type.toLowerCase().includes(searchStr)
    );
  });

  const getIcon = (type) => {
    switch (type) {
      case 'Course':
        return <SchoolIcon />;
      case 'Video':
        return <VideoIcon />;
      case 'Article':
        return <ArticleIcon />;
      default:
        return <BookIcon />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs>
          <Typography variant="h4">
            Medical Education
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <SearchBar
            placeholder="Search resources..."
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
                Available Courses
              </Typography>
              <Typography variant="h4">12</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                CME Credits
              </Typography>
              <Typography variant="h4">45</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completed
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
              <Typography variant="h4">4</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Resources List */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Educational Resources</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<BookIcon />}
          >
            Browse Catalog
          </Button>
        </Box>

        <List>
          {filteredResources.map((resource) => (
            <React.Fragment key={resource.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    {getIcon(resource.type)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {resource.title}
                      <Chip
                        label={resource.type}
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
                      {`Duration: ${resource.duration} | Added: ${resource.date}`}
                    </Typography>
                  }
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<AssignmentIcon />}
                  >
                    {resource.status === 'Completed' ? 'View Certificate' : 'Start Learning'}
                  </Button>
                  <Chip
                    label={resource.status}
                    color={
                      resource.status === 'Completed' ? 'success' :
                      resource.status === 'In Progress' ? 'warning' :
                      resource.status === 'New' ? 'info' : 'default'
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

export default Education;
