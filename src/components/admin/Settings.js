import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

const Settings = () => {
  const [settings, setSettings] = useState({
    hospitalName: 'MediCSL Hospital',
    email: 'admin@medicsl.com',
    phone: '+1234567890',
    address: '123 Healthcare Street, Medical City',
    enableNotifications: true,
    enableEmailAlerts: true,
    enableSMS: false,
    darkMode: false,
    autoBackup: true,
    maintenanceMode: false,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setSettings(prev => ({
      ...prev,
      [name]: event.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // TODO: Implement API call to save settings
    setSnackbar({
      open: true,
      message: 'Settings saved successfully!',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        System Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Hospital Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Hospital Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Hospital Name"
                    name="hospitalName"
                    value={settings.hospitalName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={settings.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    multiline
                    rows={2}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notification Settings
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Enable Notifications"
                    secondary="Receive system notifications"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      name="enableNotifications"
                      checked={settings.enableNotifications}
                      onChange={handleChange}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Email Alerts"
                    secondary="Receive email notifications"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      name="enableEmailAlerts"
                      checked={settings.enableEmailAlerts}
                      onChange={handleChange}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="SMS Notifications"
                    secondary="Receive SMS alerts"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      name="enableSMS"
                      checked={settings.enableSMS}
                      onChange={handleChange}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* System Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Settings
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Dark Mode"
                    secondary="Enable dark theme"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      name="darkMode"
                      checked={settings.darkMode}
                      onChange={handleChange}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Auto Backup"
                    secondary="Automatically backup system data"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      name="autoBackup"
                      checked={settings.autoBackup}
                      onChange={handleChange}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Maintenance Mode"
                    secondary="Put system in maintenance mode"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      name="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onChange={handleChange}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Save Settings
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
