import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Paper,
  Grid,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import axios from 'axios';

const MedicineDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchMedicineDetails();
    fetchTransactionHistory();
  }, [id]);

  const fetchMedicineDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/inventory/${id}`);
      setMedicine(response.data);
    } catch (error) {
      console.error('Error fetching medicine details:', error);
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/inventory/${id}/transactions`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  };

  if (!medicine) {
    return <Typography>Loading...</Typography>;
  }

  const getStockStatus = () => {
    if (medicine.quantity <= 0) {
      return { label: 'Out of Stock', color: 'error' };
    }
    if (medicine.quantity <= medicine.reorderLevel) {
      return { label: 'Low Stock', color: 'warning' };
    }
    return { label: 'In Stock', color: 'success' };
  };

  return (
    <div>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Medicine Details
        </Typography>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/inventory/${id}/edit`)}
        >
          Edit Medicine
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="textSecondary">Name</Typography>
                <Typography variant="body1">{medicine.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography color="textSecondary">Category</Typography>
                <Typography variant="body1">{medicine.category}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography color="textSecondary">Current Stock</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    {medicine.quantity} {medicine.unit}
                  </Typography>
                  <Chip
                    label={getStockStatus().label}
                    color={getStockStatus().color}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography color="textSecondary">Unit Price</Typography>
                <Typography variant="body1">${medicine.price}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography color="textSecondary">Reorder Level</Typography>
                <Typography variant="body1">{medicine.reorderLevel} {medicine.unit}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Additional Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography color="textSecondary">Description</Typography>
                <Typography variant="body1">{medicine.description || 'No description available'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography color="textSecondary">Manufacturer</Typography>
                <Typography variant="body1">{medicine.manufacturer || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography color="textSecondary">Expiry Date</Typography>
                <Typography variant="body1">
                  {medicine.expiryDate ? new Date(medicine.expiryDate).toLocaleDateString() : 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <HistoryIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Transaction History</Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Reference</TableCell>
                <TableCell>Updated By</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.type}
                      color={transaction.type === 'IN' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{transaction.quantity} {medicine.unit}</TableCell>
                  <TableCell>{transaction.reference}</TableCell>
                  <TableCell>{transaction.updatedBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default MedicineDetails;
