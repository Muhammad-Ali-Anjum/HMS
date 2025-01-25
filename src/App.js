import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Layout Components
import Layout from './components/layout/Layout';

// Auth Components
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import DoctorPanel from './components/admin/panels/DoctorPanel';
import NursePanel from './components/admin/panels/NursePanel';
import ReceptionistPanel from './components/admin/panels/ReceptionistPanel';
import PatientPanel from './components/admin/panels/PatientPanel';
import PharmacistPanel from './components/admin/panels/PharmacistPanel';
import LaboratoryPanel from './components/admin/panels/LaboratoryPanel';
import HRPanel from './components/admin/panels/HRPanel';
import FinancePanel from './components/admin/panels/FinancePanel';

// Role-specific Components
import DoctorWorkPanel from './components/panels/DoctorWorkPanel';
import NurseWorkPanel from './components/panels/NurseWorkPanel';

// Context Provider
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route
              element={
                <PrivateRoute>
                  <Layout>
                    <Outlet />
                  </Layout>
                </PrivateRoute>
              }
            >
              {/* Admin Routes */}
              <Route path="/admin">
                <Route index element={<AdminDashboard />} />
                <Route path="doctor-panel" element={<DoctorPanel />} />
                <Route path="nurse-panel" element={<NursePanel />} />
                <Route path="receptionist-panel" element={<ReceptionistPanel />} />
                <Route path="patient-panel" element={<PatientPanel />} />
                <Route path="pharmacist-panel" element={<PharmacistPanel />} />
                <Route path="laboratory-panel" element={<LaboratoryPanel />} />
                <Route path="hr-panel" element={<HRPanel />} />
                <Route path="finance-panel" element={<FinancePanel />} />
              </Route>

              {/* Doctor Routes */}
              <Route path="/doctor/*" element={<DoctorWorkPanel />} />
              
              {/* Nurse Routes */}
              <Route path="/nurse/*" element={<NurseWorkPanel />} />
              
              {/* Default Route */}
              <Route path="/" element={<Navigate to="/admin" replace />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
