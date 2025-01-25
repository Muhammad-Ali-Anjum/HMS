import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  Alert,
} from '@mui/material';
import SearchBar from '../../common/SearchBar';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    darkMode: false,
    showPatientHistory: true,
    autoSaveReports: true,
  });

  const [saved, setSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs>
          <Typography variant="h4">
            Settings
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <SearchBar
            placeholder="Search settings..."
            value={searchQuery}
            onChange={handleSearch}
            onClear={() => setSearchQuery('')}
          />
        </Grid>
      </Grid>

      {saved && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Notifications */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  name="emailNotifications"
                />
              }
              label="Email Notifications"
            />
            <Typography variant="body2" color="textSecondary" sx={{ ml: 4, mb: 2 }}>
              Receive notifications via email
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={settings.smsNotifications}
                  onChange={handleChange}
                  name="smsNotifications"
                />
              }
              label="SMS Notifications"
            />
            <Typography variant="body2" color="textSecondary" sx={{ ml: 4, mb: 2 }}>
              Receive notifications via SMS
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={settings.appointmentReminders}
                  onChange={handleChange}
                  name="appointmentReminders"
                />
              }
              label="Appointment Reminders"
            />
            <Typography variant="body2" color="textSecondary" sx={{ ml: 4 }}>
              Receive reminders for upcoming appointments
            </Typography>
          </Paper>
        </Grid>

        {/* Preferences */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Preferences
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.darkMode}
                  onChange={handleChange}
                  name="darkMode"
                />
              }
              label="Dark Mode"
            />
            <Typography variant="body2" color="textSecondary" sx={{ ml: 4, mb: 2 }}>
              Enable dark mode for the interface
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={settings.showPatientHistory}
                  onChange={handleChange}
                  name="showPatientHistory"
                />
              }
              label="Show Patient History"
            />
            <Typography variant="body2" color="textSecondary" sx={{ ml: 4, mb: 2 }}>
              Always show patient history on profile
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={settings.autoSaveReports}
                  onChange={handleChange}
                  name="autoSaveReports"
                />
              }
              label="Auto-save Reports"
            />
            <Typography variant="body2" color="textSecondary" sx={{ ml: 4 }}>
              Automatically save report drafts
            </Typography>
          </Paper>
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              Save Settings
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
