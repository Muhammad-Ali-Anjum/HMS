import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import {
  Person as PersonIcon,
  Event as EventIcon,
  People as PeopleIcon,
  Science as ScienceIcon,
  Videocam as VideocamIcon,
  School as SchoolIcon,
  Receipt as ReceptionIcon,
} from '@mui/icons-material';

// Import components
import MyAccount from './doctor/MyAccount';
import Appointments from './doctor/Appointments';
import Patients from './doctor/Patients';
import LabTests from './doctor/LabTests';
import Telehealth from './doctor/Telehealth';
import Education from './doctor/Education';
import Reception from './doctor/Reception';

const drawerWidth = 240;

const DoctorWorkPanel = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'My Account', icon: <PersonIcon />, path: 'myaccount' },
    { text: 'Appointments', icon: <EventIcon />, path: 'appointments' },
    { text: 'Patients', icon: <PeopleIcon />, path: 'patients' },
    { text: 'Lab Tests', icon: <ScienceIcon />, path: 'labtests' },
    { text: 'Reception', icon: <ReceptionIcon />, path: 'reception' },
    { text: 'Telehealth', icon: <VideocamIcon />, path: 'telehealth' },
    { text: 'Education', icon: <SchoolIcon />, path: 'education' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop: '64px', // Height of AppBar
          },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px' }}>
        <Routes>
          <Route path="myaccount" element={<MyAccount />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="patients" element={<Patients />} />
          <Route path="labtests" element={<LabTests />} />
          <Route path="reception" element={<Reception />} />
          <Route path="telehealth" element={<Telehealth />} />
          <Route path="education" element={<Education />} />
          <Route path="*" element={<Navigate to="myaccount" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default DoctorWorkPanel;
