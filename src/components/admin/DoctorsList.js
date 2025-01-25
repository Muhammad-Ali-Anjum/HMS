import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'Dr. John Smith',
      specialization: 'Cardiologist',
      email: 'john.smith@medicsl.com',
      phone: '+1 234-567-8900',
      experience: '15 years',
      status: 'Active',
      availability: true,
      image: '',
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      specialization: 'Pediatrician',
      email: 'sarah.johnson@medicsl.com',
      phone: '+1 234-567-8901',
      experience: '10 years',
      status: 'Active',
      availability: true,
      image: '',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: '',
    experience: '',
    status: 'Active',
    availability: true,
    password: '', // For new doctors
  });

  const specializations = [
    'Cardiologist',
    'Pediatrician',
    'Neurologist',
    'Dermatologist',
    'Orthopedist',
    'General Physician',
    'Psychiatrist',
    'Gynecologist',
  ];

  const handleOpenDialog = (doctor = null) => {
    if (doctor) {
      setSelectedDoctor(doctor);
      setFormData({ ...doctor });
    } else {
      setSelectedDoctor(null);
      setFormData({
        name: '',
        specialization: '',
        email: '',
        phone: '',
        experience: '',
        status: 'Active',
        availability: true,
        password: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDoctor(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleChange = (name) => (event) => {
    setFormData(prev => ({
      ...prev,
      [name]: event.target.checked
    }));
  };

  const handleSubmit = () => {
    if (selectedDoctor) {
      // Update existing doctor
      setDoctors(prev =>
        prev.map(doc =>
          doc.id === selectedDoctor.id ? { ...formData, id: doc.id } : doc
        )
      );
      showSnackbar('Doctor updated successfully', 'success');
    } else {
      // Add new doctor
      const newDoctor = {
        ...formData,
        id: doctors.length + 1,
      };
      setDoctors(prev => [...prev, newDoctor]);
      showSnackbar('Doctor added successfully', 'success');
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setDoctors(prev => prev.filter(doc => doc.id !== id));
    showSnackbar('Doctor deleted successfully', 'success');
  };

  const handleToggleAccess = (id) => {
    setDoctors(prev =>
      prev.map(doc =>
        doc.id === id ? { ...doc, status: doc.status === 'Active' ? 'Inactive' : 'Active' } : doc
      )
    );
    showSnackbar('Doctor access updated', 'success');
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        {/* Header */}
        <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" component="h2" gutterBottom>
              Doctors Management
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
              <TextField
                size="small"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{ flexGrow: 1, maxWidth: 300 }}
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
              >
                Add Doctor
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Doctors Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Doctor</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Availability</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDoctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar src={doctor.image}>{doctor.name[0]}</Avatar>
                      <Box>
                        <Typography variant="subtitle2">{doctor.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {doctor.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.phone}</TableCell>
                  <TableCell>{doctor.experience}</TableCell>
                  <TableCell>
                    <Chip
                      label={doctor.status}
                      color={doctor.status === 'Active' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={doctor.availability}
                          onChange={() => {
                            setDoctors(prev =>
                              prev.map(doc =>
                                doc.id === doctor.id
                                  ? { ...doc, availability: !doc.availability }
                                  : doc
                              )
                            );
                          }}
                          size="small"
                        />
                      }
                      label={doctor.availability ? 'Available' : 'Unavailable'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(doctor)}
                      sx={{ color: 'primary.main' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleToggleAccess(doctor.id)}
                      sx={{ color: doctor.status === 'Active' ? 'success.main' : 'error.main' }}
                    >
                      {doctor.status === 'Active' ? <LockOpenIcon /> : <LockIcon />}
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(doctor.id)}
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit Doctor Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedDoctor ? 'Edit Doctor' : 'Add New Doctor'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Specialization</InputLabel>
                  <Select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    label="Specialization"
                  >
                    {specializations.map((spec) => (
                      <MenuItem key={spec} value={spec}>
                        {spec}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
              </Grid>
              {!selectedDoctor && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Initial Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    label="Status"
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.availability}
                      onChange={handleToggleChange('availability')}
                    />
                  }
                  label="Available for Appointments"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!formData.name || !formData.email || !formData.specialization}
            >
              {selectedDoctor ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default DoctorsList;
