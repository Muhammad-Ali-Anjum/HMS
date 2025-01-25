import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import axios from 'axios';

const SystemLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    level: 'all',
    type: 'all',
    search: '',
  });

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/logs');
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching system logs:', error);
    }
  };

  const getLogIcon = (level) => {
    switch (level.toLowerCase()) {
      case 'error':
        return <ErrorIcon color="error" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      default:
        return <InfoIcon color="info" />;
    }
  };

  const getLogColor = (level) => {
    switch (level.toLowerCase()) {
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesLevel = filters.level === 'all' || log.level === filters.level;
    const matchesType = filters.type === 'all' || log.type === filters.type;
    const matchesSearch =
      filters.search === '' ||
      log.message.toLowerCase().includes(filters.search.toLowerCase()) ||
      log.user?.toLowerCase().includes(filters.search.toLowerCase());

    return matchesLevel && matchesType && matchesSearch;
  });

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        System Logs
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            select
            label="Log Level"
            value={filters.level}
            onChange={(e) => setFilters({ ...filters, level: e.target.value })}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="all">All Levels</MenuItem>
            <MenuItem value="error">Error</MenuItem>
            <MenuItem value="warning">Warning</MenuItem>
            <MenuItem value="info">Info</MenuItem>
          </TextField>
          <TextField
            select
            label="Log Type"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="auth">Authentication</MenuItem>
            <MenuItem value="system">System</MenuItem>
            <MenuItem value="user">User Activity</MenuItem>
          </TextField>
          <TextField
            label="Search"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            sx={{ flexGrow: 1 }}
          />
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>User</TableCell>
              <TableCell>IP Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log._id}>
                <TableCell>
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getLogIcon(log.level)}
                    <Chip
                      label={log.level}
                      color={getLogColor(log.level)}
                      size="small"
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip label={log.type} size="small" />
                </TableCell>
                <TableCell>{log.message}</TableCell>
                <TableCell>{log.user || 'System'}</TableCell>
                <TableCell>{log.ipAddress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SystemLogs;
