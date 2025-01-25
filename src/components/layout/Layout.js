import React from 'react';
import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  LocalHospital as DoctorIcon,
  Healing as NurseIcon,
  Person as PatientIcon,
  Receipt as ReceptionistIcon,
  Science as LabIcon,
  LocalPharmacy as PharmacyIcon,
  People as HRIcon,
  AttachMoney as FinanceIcon,
  ExitToApp as LogoutIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Event as EventIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 240;

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const adminMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Doctor Panel', icon: <DoctorIcon />, path: '/admin/doctor-panel' },
    { text: 'Nurse Panel', icon: <NurseIcon />, path: '/admin/nurse-panel' },
    { text: 'Receptionist Panel', icon: <ReceptionistIcon />, path: '/admin/receptionist-panel' },
    { text: 'Patient Panel', icon: <PatientIcon />, path: '/admin/patient-panel' },
    { text: 'Pharmacist Panel', icon: <PharmacyIcon />, path: '/admin/pharmacist-panel' },
    { text: 'Laboratory Panel', icon: <LabIcon />, path: '/admin/laboratory-panel' },
    { text: 'HR & Payroll Panel', icon: <HRIcon />, path: '/admin/hr-panel' },
    { text: 'Finance Panel', icon: <FinanceIcon />, path: '/admin/finance-panel' },
  ];

  const doctorMenuItems = [
    { text: 'My Account', icon: <PersonIcon />, path: '/doctor/myaccount' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/doctor/settings' },
    { text: 'Appointments', icon: <EventIcon />, path: '/doctor/appointments' },
    { text: 'Patients', icon: <PeopleIcon />, path: '/doctor/patients' },
  ];

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return adminMenuItems;
      case 'doctor':
        return doctorMenuItems;
      default:
        return [];
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>
          HMS - {user?.role?.toUpperCase()}
        </Typography>
      </Toolbar>
      <List>
        {getMenuItems().map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem button onClick={logout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Hospital Management System - {user?.role?.toUpperCase()}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
