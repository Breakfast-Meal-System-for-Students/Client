import React, { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  Toolbar,
  TableBody,
  TextField,
} from '@mui/material';
import {
  StyledPaper,
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableRow,
  StyledTableCell,
} from './ManageOrders.style';

const OrderShop = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term

  // Fetch orders from the API
  const fetchOrders = async () => {
    try {
      const response = await fetch('https://bms-fs-api.azurewebsites.net/api/Order/GetListOrders?pageIndex=1&pageSize=6', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      console.log(data);

      if (Array.isArray(data.data.data)) {
        setOrders(data.data.data);
      } else {
        console.error('Fetched data is not an array', data.data.data);
        setOrders([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on the search term
  const filteredOrders = orders.filter(order => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.id.toString().includes(searchLower) ||
      order.firstName.toLowerCase().includes(searchLower) ||
      order.lastName.toLowerCase().includes(searchLower) ||
      order.shopName.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return <Typography variant="h6">Loading orders...</Typography>;
  }

  if (!Array.isArray(orders) || orders.length === 0) {
    return <Typography variant="h6">No orders available.</Typography>;
  }

  return (
    <StyledPaper>
      <Toolbar sx={{ justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Manage Orders
        </Typography>

        {/* Search Bar */}
        <TextField
          label="Search Orders"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Order ID, Customer, or Shop"
          size="small"
        />
      </Toolbar>

      <StyledTableContainer>
        <StyledTable aria-label="orders table">
          <StyledTableHead>
            <StyledTableRow>
              <StyledTableCell>Order ID</StyledTableCell>
              <StyledTableCell>Customer</StyledTableCell>
              <StyledTableCell>Shop</StyledTableCell>
              <StyledTableCell>Total Price</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Order Date</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </StyledTableRow>
          </StyledTableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <StyledTableRow key={order.id}>
                <StyledTableCell>{order.id}</StyledTableCell>
                <StyledTableCell>
                  <img
                    src={order.avatar}
                    alt={`${order.firstName} ${order.lastName}`}
                    style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }}
                  />
                  {order.firstName} {order.lastName}
                </StyledTableCell>
                <StyledTableCell>
                  <img
                    src={order.shopImage}
                    alt={order.shopName}
                    style={{ width: 30, height: 30, borderRadius: '5%', marginRight: 8 }}
                  />
                  {order.shopName}
                </StyledTableCell>
                <StyledTableCell>${order.totalPrice.toFixed(2)}</StyledTableCell>
                <StyledTableCell>{order.status}</StyledTableCell>
                <StyledTableCell>{new Date(order.orderDate).toLocaleString()}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button variant="contained" color="primary">
                    View Details
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </StyledPaper>
  );
};

export default OrderShop;
