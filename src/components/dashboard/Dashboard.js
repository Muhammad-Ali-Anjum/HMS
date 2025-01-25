import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    appointmentsToday: 0,
    appointmentsThisWeek: 0,
    recentPatients: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value }) => (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="p">
        {value}
      </Typography>
    </Paper>
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Total Patients" value={stats.totalPatients} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Today's Appointments" value={stats.appointmentsToday} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="This Week's Appointments" value={stats.appointmentsThisWeek} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Recent Patients" value={stats.recentPatients.length} />
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Appointments Trend
          </Typography>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart
                data={stats.recentPatients}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="appointments"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
