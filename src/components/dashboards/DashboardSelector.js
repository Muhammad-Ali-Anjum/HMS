import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Import all dashboards
import AdminDashboard from '../admin/AdminDashboard';
import DoctorWorkPanel from '../panels/DoctorWorkPanel';
import NurseWorkPanel from '../panels/NurseWorkPanel';
import ReceptionistDashboard from './ReceptionistDashboard';
import PatientDashboard from './PatientDashboard';
import PharmacistDashboard from './PharmacistDashboard';
import LaboratoryDashboard from './LaboratoryDashboard';
import HRDashboard from './HRDashboard';
import FinanceDashboard from './FinanceDashboard';

const DashboardSelector = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const dashboardMap = {
    admin: <AdminDashboard />,
    doctor: <DoctorWorkPanel />,
    nurse: <NurseWorkPanel />,
    receptionist: <ReceptionistDashboard />,
    patient: <PatientDashboard />,
    pharmacist: <PharmacistDashboard />,
    laboratory: <LaboratoryDashboard />,
    hr: <HRDashboard />,
    finance: <FinanceDashboard />,
  };

  const Dashboard = dashboardMap[user?.role];
  if (!Dashboard) {
    return <Navigate to="/login" replace />;
  }

  return Dashboard;
};

export default DashboardSelector;
