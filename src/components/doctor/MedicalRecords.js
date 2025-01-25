import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Description as FileIcon,
} from '@mui/icons-material';

const MedicalRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Mock data - replace with actual API call
  const records = [
    {
      id: 1,
      patientName: 'John Doe',
      recordType: 'Diagnosis',
      date: '2025-01-08',
      condition: 'Hypertension',
      lastUpdated: '2025-01-08',
      attachments: 2,
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      recordType: 'Lab Results',
      date: '2025-01-05',
      condition: 'Diabetes Type 2',
      lastUpdated: '2025-01-07',
      attachments: 3,
    },
    // Add more mock data as needed
  ];

  const handleOpenDialog = (record) => {
    setSelectedRecord(record);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRecord(null);
  };

  const getRecordTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'diagnosis':
        return 'primary';
      case 'lab results':
        return 'info';
      case 'prescription':
        return 'success';
      case 'treatment plan':
        return 'warning';
      default:
        return 'default';
    }
  };

  const filteredRecords = records.filter(record =>
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Medical Records
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {/* Handle add new record */}}
        >
          New Record
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search records by patient name or condition..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Paper>
        <List>
          {filteredRecords.map((record) => (
            <React.Fragment key={record.id}>
              <ListItem>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {record.patientName}
                      <Chip
                        label={record.recordType}
                        color={getRecordTypeColor(record.recordType)}
                        size="small"
                      />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {record.condition}
                      </Typography>
                      {' — '}
                      {`Date: ${record.date} | Last Updated: ${record.lastUpdated}`}
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <Chip
                    icon={<FileIcon />}
                    label={`${record.attachments} files`}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <IconButton
                    edge="end"
                    aria-label="view"
                    onClick={() => handleOpenDialog(record)}
                    sx={{ mr: 1 }}
                  >
                    <ViewIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => {/* Handle edit */}}
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Record Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Medical Record Details
        </DialogTitle>
        <DialogContent>
          {selectedRecord && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedRecord.patientName}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Condition:</strong> {selectedRecord.condition}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Record Type:</strong> {selectedRecord.recordType}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Date:</strong> {selectedRecord.date}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Last Updated:</strong> {selectedRecord.lastUpdated}
              </Typography>
              <Typography variant="body1">
                <strong>Attachments:</strong> {selectedRecord.attachments} files
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {/* Handle edit */}}
          >
            Edit Record
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MedicalRecords;
