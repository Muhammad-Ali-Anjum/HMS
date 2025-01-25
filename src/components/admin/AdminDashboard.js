import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import {
  LocalHospital as DoctorIcon,
  Healing as NurseIcon,
  Person as PatientIcon,
  Receipt as ReceptionistIcon,
  Science as LabIcon,
  LocalPharmacy as PharmacyIcon,
  People as HRIcon,
  AttachMoney as FinanceIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../common/SearchBar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const panels = [
    {
      title: 'Doctor Panel',
      icon: <DoctorIcon sx={{ fontSize: 40 }} />,
      count: 25,
      path: '/admin/doctor-panel',
      color: '#1976d2',
    },
    {
      title: 'Nurse Panel',
      icon: <NurseIcon sx={{ fontSize: 40 }} />,
      count: 40,
      path: '/admin/nurse-panel',
      color: '#2196f3',
    },
    {
      title: 'Receptionist Panel',
      icon: <ReceptionistIcon sx={{ fontSize: 40 }} />,
      count: 10,
      path: '/admin/receptionist-panel',
      color: '#03a9f4',
    },
    {
      title: 'Patient Panel',
      icon: <PatientIcon sx={{ fontSize: 40 }} />,
      count: 500,
      path: '/admin/patient-panel',
      color: '#00bcd4',
    },
    {
      title: 'Pharmacist Panel',
      icon: <PharmacyIcon sx={{ fontSize: 40 }} />,
      count: 8,
      path: '/admin/pharmacist-panel',
      color: '#009688',
    },
    {
      title: 'Laboratory Panel',
      icon: <LabIcon sx={{ fontSize: 40 }} />,
      count: 15,
      path: '/admin/laboratory-panel',
      color: '#4caf50',
    },
    {
      title: 'HR & Payroll Panel',
      icon: <HRIcon sx={{ fontSize: 40 }} />,
      count: 5,
      path: '/admin/hr-panel',
      color: '#8bc34a',
    },
    {
      title: 'Finance Panel',
      icon: <FinanceIcon sx={{ fontSize: 40 }} />,
      count: 6,
      path: '/admin/finance-panel',
      color: '#cddc39',
    },
  ];

  const filteredPanels = panels.filter(panel =>
    panel.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs>
          <Typography variant="h4">
            Admin Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <SearchBar
            placeholder="Search panels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {filteredPanels.map((panel) => (
          <Grid item xs={12} sm={6} md={3} key={panel.title}>
            <Card
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'scale(1.02)',
                  transition: 'all 0.2s ease-in-out',
                },
              }}
              onClick={() => navigate(panel.path)}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: `${panel.color}20`,
                      color: panel.color,
                      mr: 2,
                    }}
                  >
                    {panel.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ color: panel.color }}
                    >
                      {panel.count}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h6" gutterBottom>
                  {panel.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to manage {panel.title.toLowerCase()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
