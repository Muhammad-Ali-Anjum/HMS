import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  Button,
  Divider,
  TextField,
} from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import { Person as PersonIcon } from '@mui/icons-material';
import SearchBar from '../../common/SearchBar';

const MyAccount = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs>
          <Typography variant="h4">
            My Account
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <SearchBar
            placeholder="Search in profile..."
            value={searchQuery}
            onChange={handleSearch}
            onClear={() => setSearchQuery('')}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
            >
              <PersonIcon sx={{ fontSize: 80 }} />
            </Avatar>
            <Typography variant="h6" gutterBottom>
              {user?.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {user?.role.toUpperCase()}
            </Typography>
            <Typography color="textSecondary">
              {user?.department}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Update Profile Picture
            </Button>
          </Paper>
        </Grid>

        {/* Account Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Account Details
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={user?.name}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={user?.email}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department"
                  value={user?.department}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Role"
                  value={user?.role.toUpperCase()}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                >
                  Update Profile
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                >
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Additional Information */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Professional Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="License Number"
                  value="MD123456"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Specialization"
                  value="Cardiology"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Years of Experience"
                  value="10"
                  disabled
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyAccount;
