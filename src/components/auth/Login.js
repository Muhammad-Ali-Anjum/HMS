import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Link,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      const user = await login(formData.username, formData.password);
      
      // Redirect based on user role
      const dashboardPath = user.role === 'admin' 
        ? '/admin/dashboard'
        : `/${user.role}/dashboard`;
        
      navigate(dashboardPath);
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Hospital Management System
          </Typography>
          <Typography component="h2" variant="h6" align="center" gutterBottom>
            Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </form>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              Available Users (for testing):
            </Typography>
            <Box sx={{ mt: 1, fontSize: '0.875rem' }}>
              <Typography variant="body2" color="text.secondary">
                Admin: admin / admin123
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Doctor: doctor / doctor123
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nurse: nurse / nurse123
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Receptionist: receptionist / reception123
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Patient: patient / patient123
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pharmacist: pharmacist / pharm123
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Laboratory: lab / lab123
              </Typography>
              <Typography variant="body2" color="text.secondary">
                HR: hr / hr123
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Finance: finance / finance123
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
