import React from 'react';
import { 
  TextField, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Pagination, 
  Dialog, DialogTitle, DialogContent, DialogActions, Grid, Avatar, Typography, InputAdornment 
} from '@mui/material'; // MUI imports
import SearchIcon from '@mui/icons-material/Search'; // Import Search icon

const StaffPageContainer = ({
  staff = [],
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
  newStaff = {},
  setNewStaff,
  setPageIndex,
}) => {
  return (
    <div>
      {/* Header with Title and Add Staff Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4">Manage Staff</Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Search Bar */}
          <TextField
            label="Search Staff"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            style={{ marginRight: '20px', width: '300px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
          >
            Add Account
          </Button>
        </div>
      </div>

      {/* Staff Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Create Date</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staff.length > 0 ? (
              staff.map((staffMember) => (
                <TableRow key={staffMember.id}>
                  <TableCell>
                    <Avatar alt={staffMember.firstName} src={staffMember.avatar} />
                  </TableCell>
                  <TableCell>{staffMember.firstName}</TableCell>
                  <TableCell>{staffMember.lastName}</TableCell>
                  <TableCell>{staffMember.email}</TableCell>
                  <TableCell>{staffMember.phone || 'N/A'}</TableCell>
                  <TableCell>{new Date(staffMember.createDate).toLocaleDateString()}</TableCell>
                  <TableCell>{staffMember.role || 'N/A'}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleConfirmDelete(staffMember.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="h6">No staff found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        count={Math.ceil(totalCount / pageSize)} // Calculate the number of pages
        page={pageIndex}
        onChange={(event, value) => setPageIndex(value)} // Update the pageIndex
        color="primary"
        style={{ marginTop: '20px' }}
      />

      {/* Add Staff Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Staff</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                value={newStaff.firstName || ''}
                onChange={(e) => setNewStaff({ ...newStaff, firstName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                fullWidth
                value={newStaff.lastName || ''}
                onChange={(e) => setNewStaff({ ...newStaff, lastName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                type="email"
                value={newStaff.email || ''}
                onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleAddStaff} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Deletion Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this staff member?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">Cancel</Button>
          <Button onClick={confirmDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StaffPageContainer
