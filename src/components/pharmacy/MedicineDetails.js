import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  LocalPharmacy as MedicineIcon,
  Inventory as StockIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import axios from 'axios';

const MedicineDetails = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [stockAdjustment, setStockAdjustment] = useState({
    type: 'add',
    quantity: '',
    reason: '',
  });

  useEffect(() => {
    fetchMedicineDetails();
    fetchTransactions();
  }, [id]);

  const fetchMedicineDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/pharmacy/inventory/${id}`
      );
      setMedicine(response.data);
    } catch (error) {
      console.error('Error fetching medicine details:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/pharmacy/inventory/${id}/transactions`
      );
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleStockAdjustment = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/pharmacy/inventory/${id}/adjust-stock`,
        stockAdjustment
      );
      setOpenDialog(false);
      fetchMedicineDetails();
      fetchTransactions();
    } catch (error) {
      console.error('Error adjusting stock:', error);
    }
  };

  if (!medicine) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MedicineIcon sx={{ fontSize: 40, mr: 2 }} />
              <Box>
                <Typography variant="h4">{medicine.name}</Typography>
                <Typography color="textSecondary">
                  Category: {medicine.category}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              startIcon={<StockIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Adjust Stock
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography>
                <strong>Manufacturer:</strong> {medicine.manufacturer}
              </Typography>
              <Typography>
                <strong>Price:</strong> ${medicine.price}
              </Typography>
              <Typography>
                <strong>Current Stock:</strong> {medicine.stock}
              </Typography>
              <Typography>
                <strong>Minimum Stock Level:</strong> {medicine.minStock}
              </Typography>
              <Typography>
                <strong>Expiry Date:</strong>{' '}
                {new Date(medicine.expiryDate).toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Additional Information
            </Typography>
            <Typography>{medicine.description}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <TimelineIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Stock Transaction History</Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Updated By</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>
                    {new Date(transaction.date).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.type}
                      color={transaction.type === 'add' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{transaction.quantity}</TableCell>
                  <TableCell>{transaction.reason}</TableCell>
                  <TableCell>{transaction.updatedBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Adjust Stock</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Adjustment Type"
                value={stockAdjustment.type}
                onChange={(e) =>
                  setStockAdjustment((prev) => ({
                    ...prev,
                    type: e.target.value,
                  }))
                }
                SelectProps={{
                  native: true,
                }}
              >
                <option value="add">Add Stock</option>
                <option value="remove">Remove Stock</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Quantity"
                value={stockAdjustment.quantity}
                onChange={(e) =>
                  setStockAdjustment((prev) => ({
                    ...prev,
                    quantity: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reason"
                value={stockAdjustment.reason}
                onChange={(e) =>
                  setStockAdjustment((prev) => ({
                    ...prev,
                    reason: e.target.value,
                  }))
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleStockAdjustment}
            disabled={!stockAdjustment.quantity || !stockAdjustment.reason}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MedicineDetails;
