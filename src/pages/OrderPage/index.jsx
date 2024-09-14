// src/components/ManageOrdersPage.js
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Select, MenuItem, FormControl, InputLabel, Toolbar, Typography
} from '@mui/material';

// Sample initial orders data
const initialOrders = [
  { id: 1, customer: 'John Doe', date: '2024-09-01', status: 'Pending' },
  { id: 2, customer: 'Jane Smith', date: '2024-09-02', status: 'Shipped' },
  { id: 3, customer: 'Alice Brown', date: '2024-09-03', status: 'Delivered' },
];

const ManageOrdersPage = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [editingStatus, setEditingStatus] = useState({});

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setEditingStatus({
      ...editingStatus,
      [id]: newStatus,
    });
  };

  // Update order status
  const handleUpdateStatus = (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: editingStatus[id] || order.status } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Manage Orders
        </Typography>
      </Toolbar>

      {/* Orders Table */}
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={editingStatus[order.id] || order.status}
                      label="Status"
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateStatus(order.id)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ManageOrdersPage;
