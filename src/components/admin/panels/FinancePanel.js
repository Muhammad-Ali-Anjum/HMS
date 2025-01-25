import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  IconButton,
  Chip,
} from '@mui/material';
import {
  AttachMoney as MoneyIcon,
  Receipt as ReceiptIcon,
  AccountBalance as AccountIcon,
  Assignment as AssignmentIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assessment as AssessmentIcon,
  Print as PrintIcon,
} from '@mui/icons-material';

const FinancePanel = () => {
  // Mock data - replace with actual API calls
  const transactions = [
    {
      id: 1,
      patient: 'John Doe',
      type: 'Consultation',
      amount: '$150',
      date: '2025-01-23',
      status: 'Paid',
    },
    {
      id: 2,
      patient: 'Jane Smith',
      type: 'Laboratory Test',
      amount: '$300',
      date: '2025-01-23',
      status: 'Pending',
    },
  ];

  const expenses = [
    {
      id: 1,
      category: 'Medical Supplies',
      amount: '$5,000',
      date: '2025-01-23',
      status: 'Processed',
    },
    {
      id: 2,
      category: 'Equipment Maintenance',
      amount: '$2,500',
      date: '2025-01-23',
      status: 'Pending',
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'processed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Finance Management Panel
      </Typography>

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Today's Revenue
              </Typography>
              <Typography variant="h3">$12.5K</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Monthly Revenue
              </Typography>
              <Typography variant="h3">$285K</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Payments
              </Typography>
              <Typography variant="h3">$45K</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Monthly Expenses
              </Typography>
              <Typography variant="h3">$175K</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Recent Transactions</Typography>
                <Button
                  variant="contained"
                  startIcon={<ReceiptIcon />}
                  color="primary"
                >
                  New Transaction
                </Button>
              </Box>
              <List>
                {transactions.map((transaction) => (
                  <React.Fragment key={transaction.id}>
                    <ListItem
                      secondaryAction={
                        <Box>
                          <IconButton edge="end" aria-label="edit">
                            <EditIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <MoneyIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {transaction.patient}
                            <Chip
                              label={transaction.status}
                              size="small"
                              color={getStatusColor(transaction.status)}
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                        secondary={
                          <>
                            {transaction.type} • {transaction.amount} • {transaction.date}
                          </>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Expenses */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Expenses
              </Typography>
              <List>
                {expenses.map((expense) => (
                  <React.Fragment key={expense.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <AccountIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {expense.category}
                            <Chip
                              label={expense.status}
                              size="small"
                              color={getStatusColor(expense.status)}
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                        secondary={`${expense.amount} • ${expense.date}`}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<ReceiptIcon />}
                    color="primary"
                  >
                    New Invoice
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<MoneyIcon />}
                    color="secondary"
                  >
                    Record Payment
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<AssessmentIcon />}
                    color="info"
                  >
                    Financial Reports
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<PrintIcon />}
                    color="success"
                  >
                    Print Statement
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinancePanel;
