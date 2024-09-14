import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel,
  TablePagination, TextField, Toolbar, Typography
} from '@mui/material';

// Sample data for transactions
const transactionsData = [
  { id: 1, user: 'John Doe', orderID: '1234', date: '2023-09-01', amount: 120 },
  { id: 2, user: 'Jane Smith', orderID: '1235', date: '2023-09-02', amount: 85 },
  { id: 3, user: 'Bob Johnson', orderID: '1236', date: '2023-09-05', amount: 45 },
  { id: 4, user: 'Alice Brown', orderID: '1237', date: '2023-09-10', amount: 210 },
  { id: 5, user: 'Chris Green', orderID: '1238', date: '2023-09-12', amount: 340 },
  { id: 6, user: 'Megan Fox', orderID: '1239', date: '2023-09-14', amount: 50 },
  // Add more data for pagination
];

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState(transactionsData);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('user');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTransactions = filteredTransactions.sort(getComparator(order, orderBy));

  return (
    <Paper sx={{ padding: 2 }}>
      <Toolbar sx={{ pb: 3}}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Transactions
        </Typography>
        <TextField
          variant="outlined"
          label="Search by User"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: '300px' }}
        />
      </Toolbar>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="transactions table">
          <TableHead sx={{ background: 'linear-gradient(180deg, #3d996c, #00cc69)'}}>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'user'}
                  direction={orderBy === 'user' ? order : 'asc'}
                  onClick={(e) => handleRequestSort(e, 'user')}
                  sx={{ color: '#fff !important', '& .MuiSvgIcon-root': { color: '#fff', '&:active': {color: '#fff'}} }}
                >
                  User
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'orderID'}
                  direction={orderBy === 'orderID' ? order : 'asc'}
                  onClick={(e) => handleRequestSort(e, 'orderID')}
                  sx={{ color: '#fff !important', '& .MuiSvgIcon-root': { color: '#fff', '&:active': {color: '#fff'}} }}
                >
                  Order ID
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'date'}
                  direction={orderBy === 'date' ? order : 'asc'}
                  onClick={(e) => handleRequestSort(e, 'date')}
                  sx={{ color: '#fff !important', '& .MuiSvgIcon-root': { color: '#fff', '&:active': {color: '#fff'}} }}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'amount'}
                  direction={orderBy === 'amount' ? order : 'asc'}
                  onClick={(e) => handleRequestSort(e, 'amount')}
                  sx={{ color: '#fff !important', '& .MuiSvgIcon-root': { color: '#fff', '&:active': {color: '#fff'}} }}
                >
                  Amount
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell component="th" scope="row">
                  {transaction.user}
                </TableCell>
                <TableCell align="right">{transaction.orderID}</TableCell>
                <TableCell align="right">{transaction.date}</TableCell>
                <TableCell align="right">${transaction.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredTransactions.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TransactionsTable;
