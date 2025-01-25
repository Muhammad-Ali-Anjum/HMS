import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

// Mock data for finance dashboard
const mockTransactions = [
  { id: 1, description: 'Patient Payment - John Doe', amount: 500, type: 'Income' },
  { id: 2, description: 'Medical Supplies', amount: -1200, type: 'Expense' },
  { id: 3, description: 'Laboratory Tests', amount: 800, type: 'Income' },
];

const mockStats = {
  todayIncome: 5000,
  todayExpenses: 3000,
  pendingPayments: 8,
};

const FinanceDashboard = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Financial Overview
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Today's Income
              </Typography>
              <Typography variant="h4">
                ${mockStats.todayIncome}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Today's Expenses
              </Typography>
              <Typography variant="h4">
                ${mockStats.todayExpenses}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Payments
              </Typography>
              <Typography variant="h4">
                {mockStats.pendingPayments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Transactions List */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            <List>
              {mockTransactions.map((transaction, index) => (
                <React.Fragment key={transaction.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={transaction.description}
                      secondary={`${transaction.type}: $${Math.abs(transaction.amount)}`}
                      primaryTypographyProps={{
                        color: transaction.amount >= 0 ? 'success.main' : 'error.main',
                      }}
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FinanceDashboard;
