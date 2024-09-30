import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Pagination,
} from '@mui/material';

const StaffPageContainer = ({
  staff,
  searchTerm,
  setSearchTerm,
  open,
  handleClickOpen,
  handleClose,
  handleAddStaff,
  handleConfirmDelete,
  confirmOpen,
  confirmDelete,
  setConfirmOpen,
  pageIndex,
  pageSize,
  totalCount,
  newStaff,
  setNewStaff,
  setPageIndex, // Đảm bảo rằng bạn đã truyền setPageIndex
}) => {
  return (
    <div>
      <h1>Manage Staff</h1>

      {/* Search Bar */}
      <TextField
        label="Search Staff"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />

      {/* Staff Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staff.map((staffMember) => (
              <TableRow key={staffMember.id}>
                <TableCell>{staffMember.firstName}</TableCell>
                <TableCell>{staffMember.lastName}</TableCell>
                <TableCell>{staffMember.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleConfirmDelete(staffMember.id)} // Open confirmation dialog
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        count={Math.ceil(totalCount / pageSize)}
        page={pageIndex}
        onChange={(event, value) => setPageIndex(value)}
        color="primary"
        style={{ marginTop: '20px' }}
      />

      {/* Add Staff Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={{ marginTop: '20px' }}
      >
        Add Staff
      </Button>

      {/* Add Staff Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Staff</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                value={newStaff.firstName}
                onChange={(e) => setNewStaff({ ...newStaff, firstName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                fullWidth
                value={newStaff.lastName}
                onChange={(e) => setNewStaff({ ...newStaff, lastName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                value={newStaff.email}
                onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleAddStaff} color="primary">Add Account</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this account?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={confirmDelete} color="primary">Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StaffPageContainer;
